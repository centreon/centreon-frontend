import { atom } from 'jotai';

import { defaultStatusOptimizedMode } from './defaults';

const statusOptimizedModeAtom = atom(defaultStatusOptimizedMode);

export default statusOptimizedModeAtom;
