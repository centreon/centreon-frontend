import { useEffect } from 'react';

import 'ulog';
import {
  QueryKey,
  QueryObserverBaseResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import { JsonDecoder } from 'ts.data.json';
import anylogger from 'anylogger';

import { CatchErrorProps, customFetch, ResponseError } from '../customFetch';
import useSnackbar from '../../Snackbar/useSnackbar';

interface UseFetchQueryProps<T> {
  catchError?: (props: CatchErrorProps) => void;
  decoder?: JsonDecoder.Decoder<T>;
  defaultFailureMessage?: string;
  fetchHeaders?: HeadersInit;
  getEndpoint: (params?: unknown) => string;
  getQueryKey: () => string | QueryKey;
  httpCodesBypassErrorSnackbar?: Array<number>;
  isPaginated?: boolean;
  queryOptions?: Omit<
    UseQueryOptions<T | ResponseError, Error, T | ResponseError, QueryKey>,
    'queryKey' | 'queryFn'
  >;
}

interface UseFetchQueryState extends QueryObserverBaseResult {
  prefetchNextPage: ({ page, baseKey }) => void;
  prefetchPreviousPage: ({ page, baseKey }) => void;
  prefetchQuery: ({ endpointParams, queryKey }) => void;
}

const defaultCacheTime = 5 * 1_000;

const log = anylogger('API Request');

const useFetchQuery = <T extends object>({
  getEndpoint,
  getQueryKey,
  catchError,
  decoder,
  defaultFailureMessage,
  fetchHeaders,
  isPaginated,
  queryOptions,
  httpCodesBypassErrorSnackbar = [],
}: UseFetchQueryProps<T>): UseFetchQueryState => {
  const { showErrorMessage } = useSnackbar();

  const queryData = useQuery<T | ResponseError, Error>(
    getQueryKey(),
    ({ signal }): Promise<T | ResponseError> =>
      customFetch<T>({
        catchError,
        decoder,
        defaultFailureMessage,
        endpoint: getEndpoint(),
        headers: new Headers(fetchHeaders),
        signal,
      }),
    {
      cacheTime: defaultCacheTime,
      refetchOnWindowFocus: false,
      ...queryOptions,
    },
  );

  const queryClient = useQueryClient();

  const manageError = (): void => {
    const data = queryData.data as ResponseError | undefined;
    if (data?.isError) {
      log.error(data.message);
      const hasACorrespondingHttpCode = httpCodesBypassErrorSnackbar.includes(
        data?.statusCode || 0,
      );

      if (!hasACorrespondingHttpCode) {
        showErrorMessage(data?.message);
      }
    }
  };

  useEffect(() => {
    return (): void => {
      queryClient.cancelQueries(getQueryKey());
    };
  }, []);

  manageError();

  const prefetchQuery = ({ endpointParams, queryKey }): void => {
    queryClient.prefetchQuery(
      queryKey,
      ({ signal }): Promise<T | ResponseError> =>
        customFetch<T>({
          catchError,
          decoder,
          defaultFailureMessage,
          endpoint: getEndpoint(endpointParams),
          headers: new Headers(fetchHeaders),
          signal,
        }),
    );
  };

  const prefetchNextPage = ({ page, baseKey }): void => {
    if (!isPaginated) {
      return undefined;
    }

    const nextPage = page + 1;

    return prefetchQuery({
      endpointParams: { page: nextPage },
      queryKey: [baseKey, nextPage],
    });
  };

  const prefetchPreviousPage = ({ page, baseKey }): void => {
    if (!isPaginated) {
      return undefined;
    }

    const previousPage = page - 1;

    return prefetchQuery({
      endpointParams: { page: previousPage },
      queryKey: [baseKey, previousPage],
    });
  };

  return {
    ...queryData,
    isError: (queryData.data as ResponseError | undefined)?.isError ?? false,
    prefetchNextPage,
    prefetchPreviousPage,
    prefetchQuery,
  };
};

export default useFetchQuery;
