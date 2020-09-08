import { LitElement } from 'lit-element';

type Constructor<T = object> = {
  new (...args: any[]): T; //eslint-disable-line
  prototype: T;
};

export interface ProviderInterface {
  registerInstance(key: string, instance: any): void;
}

export const ProviderMixin = <T extends Constructor<LitElement>>(
  base: T
): T & Constructor<ProviderInterface> => {
  class ProviderMixin extends base implements ProviderInterface {
    _instances = new Map();

    constructor(...args: any[]) {
      super(...args);
      this.addEventListener('request-instance', (e: Event) => {
        const { key } = (e as CustomEvent).detail;
        if (this._instances.has(key)) {
          (e as CustomEvent).detail.instance = this._instances.get(key);
          e.stopPropagation();
        }
      });
    }

    registerInstance(key: string, instance: any) {
      this._instances.set(key, instance);
    }
  }
  return ProviderMixin;
};
