import { LitElement } from 'lit-element';

type Constructor<T = object> = {
    new(...args: any[]): T; //eslint-disable-line
    prototype: T;
};

export interface RequesterInterface {
    requestInstance(key: string): any;
};


export const RequesterMixin = <T extends Constructor<LitElement>>(
    base: T
): T & Constructor<RequesterInterface> => {
    class RequesterMixin extends base implements RequesterInterface {

        requestInstance(key: string) : any {
            const event = new CustomEvent('request-instance', {
                detail: { key },
                bubbles: true,
                composed: true,
                cancelable: true,
            });
            this.dispatchEvent(event);
            return (event as CustomEvent).detail.instance;
        }
    }
    return RequesterMixin;
};