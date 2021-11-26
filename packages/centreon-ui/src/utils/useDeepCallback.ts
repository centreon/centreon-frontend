import * as React from 'react';

import { useDeepCompare } from './useMemoComponent';

interface UseDeepCallback<TParameters, TReturn, TMemoProps> {
  callback: (props: TParameters) => TReturn;
  memoProps: Array<TMemoProps>;
}

const useDeepCallback = <TParameters, TReturn, TMemoProps>({
  memoProps,
  callback,
}: UseDeepCallback<TParameters, TReturn, TMemoProps>): ((
  props: TParameters,
) => TReturn) =>
  React.useCallback((props) => callback(props), useDeepCompare(memoProps));

export default useDeepCallback;
