import { css, customElement, LitElement, property } from 'lit-element';
import { html } from 'lit';

@customElement('start-component')
export class StartComponent extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name = 'start component';

  //Render the component in the light dom
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div>Hello, i'm your ${this.name}!</div>`;
  }
}
