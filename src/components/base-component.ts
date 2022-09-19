import { customElement, property, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { petApiService } from '../service/api-service';

//contains the name of the web component (html tag) as a string
@customElement('start-component')
export class BaseComponent extends LitElement {
  // here goes the style of component that uses shadow dom, not our case. We'll use the shared styles contained in src/asset/style
  static styles = css``;

  @property({type: Number})
  petId !: number;

  @state()
  private _name = '';

  @state()
  private _loading = true;

  //inside the constructor the component is initialized. Put here event listeners that target the component itself -> this.addEventListener()
  //ie the component contains a button that triggers a fn that interact with the component state. (for sure this approach can be done with onclick in the button)
  constructor() {
    super();
  }

  //put here event listeners for external events (events which come directly from the dom or another external component) document.addEventListener() or window.addEventListener()
  //fetch here datas when the api call depends on external property setting
  connectedCallback() {
    super.connectedCallback();
    //document.addEventListener(event, fn);
    try {
      petApiService.getPetById({petId: this.petId}, {mode: 'cors'})
        .then(response => {
          this._name = response.name;
          this._loading = false;
        })
    } catch (err) {
      console.log(err);
    }
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
    return this._loading
      ? html`<div>loading</div>`
      : html`<div>Hello, i'm your ${this._name}!</div>`
  }
}

//Necessary in case document.createElement is used, doing so the properties of the component are available in a ts context.
declare global {
  interface HTMLElementTagNameMap {
    'start-component': BaseComponent;
  }
}
