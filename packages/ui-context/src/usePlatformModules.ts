import * as React from 'react';

import { PlatformModules } from './types';

interface PlatformModulesState {
  platformModules: PlatformModules | undefined;
  setPlatformModules: React.Dispatch<
    React.SetStateAction<PlatformModules | undefined>
  >;
}

const usePlatformModules = (): PlatformModulesState => {
  const [platformModules, setPlatformModules] =
    React.useState<PlatformModules | undefined>(undefined);

  return { platformModules, setPlatformModules };
};

export default usePlatformModules;
