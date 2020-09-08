import { LitElement, html, css, TemplateResult } from 'lit-element';

class HomeView extends LitElement {
  static get styles() {
    return css``;
  }

  render(): TemplateResult {
    return html`home view`;
  }
}
customElements.define('home-view', HomeView);
