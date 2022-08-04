import { customElement, LitElement } from 'lit-element';
import { html } from 'lit';

@customElement('card-component')
export class Card extends LitElement {
  constructor() {
    super();
  }

  //Render the component in the light dom
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <p>text iol</p>
    `;
  }
}
