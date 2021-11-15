import { atom } from 'jotai';

import { defaultAcl } from './defaults';

import { Actions } from '.';

const aclAtom = atom<Actions>(defaultAcl.actions);

export default aclAtom;
