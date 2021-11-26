import * as React from 'react';

import { useDeepCompare } from './useMemoComponent';

interface UseDeepMemo<TVariable, TMemoProps> {
  memoProps: Array<TMemoProps>;
  variable: TVariable;
}

const useDeepMemo = <TVariable, TMemoProps>({
  memoProps,
  variable,
}: UseDeepMemo<TVariable, TMemoProps>): TVariable =>
  React.useMemo(() => variable, useDeepCompare(memoProps));

export default useDeepMemo;
