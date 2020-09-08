import { LitElement, html, css, property } from 'lit-element';
import { PendingContainer } from './mixins/PendingContainerMixin.js';
import { lazyLoad } from './directives/LazyLoad.js';
import page from 'page';
import './components/dialog-spinner.js';
import '@material/mwc-button';

export class LitShop extends PendingContainer(LitElement) {
  static styles = css`
    :host {
      display: block;
    }

    [hidden] {
      display: none;
    }
  `;

  @property({ type: String })
  currentView = 'home';

  constructor() {
    super();
    this._setupRoutes();
  }

  render() {
    return html`
      <dialog-spinner ?loading="${this.__hasPendingChildren}"></dialog-spinner>
      <main>${this._renderCurrentView()}</main>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('connected');
  }

  _setupRoutes() {
    page.redirect('/', '/home');
    page('/cart', this._handleRoute.bind(this, 'cart'));
    page();
  }

  _handleRoute(route: string) {
    this.currentView = route;
  }

  _renderCurrentView() {
    switch (this.currentView) {
      case 'home':
        return lazyLoad(
          import('./views/home-view.js'),
          html`<home-view></home-view>`
        );
      case 'cart':
        return lazyLoad(
          import('./views/cart-view.js'),
          html`<cart-view></cart-view>`
        );
    }
  }
}

customElements.define('lit-shop', LitShop);