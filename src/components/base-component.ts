import {property, customElement} from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';

//contains the name of the web component (html tag) as a string
@customElement('start-component')
export class BaseComponent extends LitElement {
  // here goes the style of component that uses shadow dom, not our case. We'll use the shared styles contained in src/asset/style
  static styles = css``;

  @property()
  name = 'start component';

  //inside the constructor the component is initialized. Put here event listeners that target the component itself -> this.addEventListener()
  //ie the component contains a button that triggers a fn that interact with the component state. (for sure this approach can be done with onclick in the button)
  constructor() {
    super();
    try {
      // fetch('https://api.publicapis.org/entries').then(response => {
      ////use response here to initialize the component
      // });
    } catch (err) {
      //manage error;
    }
  }

  //put here event listeners for external events (events which come directly from the dom or another external component) document.addEventListener() or window.addEventListener()
  connectedCallback() {
    super.connectedCallback();
    //document.addEventListener(event, fn);
  }

  //disconnect event listener
  disconnectedCallback() {
    //document.removeEventListener(event, fn);
    super.disconnectedCallback();
  }

  //Render the component in the light dom
  createRenderRoot() {
    return this;
  }

  //The function which renders the template of the component. it's called everytime we use the tag of the component inside the project
  render() {
    return html`<div>Hello, i'm your ${this.name}!</div>`;
  }
}

//Necessary if case document.createElement is used, doing so the properties of the component are available in a ts context.
declare global {
  interface HTMLElementTagNameMap {
    'start-component': BaseComponent;
  }
}
