import { LitElement, html, css, property, TemplateResult } from 'lit-element';
import '@material/mwc-dialog';

class DialogSpinner extends LitElement {
  @property({ type: Boolean }) loading = false;

  static get styles() {
    return css``;
  }

  render(): TemplateResult {
    return html`<mwc-dialog
      ?open="${this.loading}"
      hideActions
      scrimClickAction=""
      >Loading</mwc-dialog
    >`;
  }
}

customElements.define('dialog-spinner', DialogSpinner);
