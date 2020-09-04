import { html, fixture, expect } from '@open-wc/testing';

import { LitShop } from '../src/LitShop.js';
import '../src/lit-shop.js';

describe('LitShop', () => {
  let element: LitShop;
  beforeEach(async () => {
    element = await fixture(html` <lit-shop></lit-shop> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
