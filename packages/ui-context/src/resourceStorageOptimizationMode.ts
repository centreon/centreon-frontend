import { atom } from 'jotai';

import { defaultResourceStorageOptimizationMode } from './defaults';

const statusResourceStorageOptimizationAtom = atom(
  defaultResourceStorageOptimizationMode,
);

export default statusResourceStorageOptimizationAtom;
