import { fixture, html, expect } from '@open-wc/testing';
import { ProviderMixin } from '../src/mixins/provider-mixin.js';
import { LitElement, customElement } from 'lit-element';
import { RequesterMixin } from '../src/mixins/requester-mixin.js';

class UserDemoClass {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

@customElement('demo-fixture')
class DemoElement extends ProviderMixin(RequesterMixin(LitElement)) {}

describe('Provider and Requester Mixin', () => {
  let element: DemoElement;
  beforeEach(async () => {
    element = await fixture(html`<demo-fixture></demo-fixture>`);
  });

  it('registers and returns an instance', async () => {
    const demoClass = new UserDemoClass('test');
    element.registerInstance('demo-key', demoClass);
    const instance = element.requestInstance('demo-key');
    expect(instance.name).to.be.equal('test');
  });

  it('requesting a non existing instance shouldnt return anything', async () => {
    const instance = element.requestInstance('demo-key');
    expect(instance).to.be.equal(undefined);
  });
});
