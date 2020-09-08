import { LitElement, property } from 'lit-element';

type Constructor<T = object> = {
  new (...args: any[]): T; //eslint-disable-line
  prototype: T;
};

export interface PendingContainerInterface {
  __pendingCount: number;
  __hasPendingChildren: boolean;
}

export const PendingContainer = <T extends Constructor<LitElement>>(
  base: T
): T & Constructor<PendingContainerInterface> => {
  class PendingContainer extends base implements PendingContainerInterface {
    @property()
    __hasPendingChildren = false;
    @property()
    __pendingCount = 0;

    constructor(...args: any[]) {
      super(...args);
      addEventListener('pending-state', async (e: Event) => {
        this.__hasPendingChildren = true;
        this.__pendingCount++;
        await (e as CustomEvent).detail.promise;
        this.__pendingCount--;
        this.__hasPendingChildren = this.__pendingCount !== 0;
      });
    }
  }
  return PendingContainer;
};
