import { getRoot as MSTgetRoot, IAnyStateTreeNode } from 'mobx-state-tree';

import { IRootStore } from '../stores/root-store';

export const getRoot = (target: IAnyStateTreeNode) => MSTgetRoot(target) as IRootStore;
