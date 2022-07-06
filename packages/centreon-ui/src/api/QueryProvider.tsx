import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

interface Props {
  children: ReactNode;
}

const QueryProvider = ({ children }: Props): JSX.Element => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default QueryProvider;
