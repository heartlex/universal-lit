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
      <div class="card  my-3">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div class="card-title fw-bold fs-5 text-uppercase">billing info</div>
            <div class="dropdown">
              <button id="dropdownBillingInfoButton" data-bs-toggle="dropdown" aria-expanded="false" type="button" class="btn btn-xs icon btn-outline-primary">
                <i class="far fa-ellipsis-h" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownBillingInfoButton" style="">
                <li><a class="dropdown-item" href="#">Edit billing info</a></li>
              </ul>
            </div>
          </div>
          <div class="d-flex align-items-center mb-2">
            <div class="d-flex">
              <strong class="me-1">Address:</strong>
              <span id="companyAddress" class="me-3">Company <br> Street number, city <br> postal code, state <br> Vat number
                    </span>
            </div>
            <i class="far fa-copy icon-click" onclick="copyToClipboard(this,&quot;companyAddress&quot;)" aria-hidden="true"></i>
          </div>
          <div class="card-text mb-2">
            <strong class="me-1">Iban:</strong>
            <span id="iban" class="me-3">aabbcc12345</span>
            <i class="far fa-copy" onclick="copyToClipboard(this,&quot;iban&quot;)" aria-hidden="true"></i>
          </div>
          <div class="card-text mb-2">
            <strong class="me-1">Swift code:</strong>
            <span id="swift" class="me-3">swift123456</span>
            <i class="far fa-copy" onclick="copyToClipboard(this,&quot;swift&quot;)" aria-hidden="true"></i>
          </div>
          <div class="card-text mb-2">
            <strong class="me-1">Paypal:</strong>
            <span id="paypal" class="me-3"> paypal@paypal.com</span>
            <i class="far fa-copy" onclick="copyToClipboard(this,&quot;paypal&quot;)" aria-hidden="true"></i>
          </div>
          <div class="card-text flex-wrap">
            <strong class="me-1">Finance contact:</strong>
            <span id="financeContact" class="me-3"> paypal@paypal.com</span>
            <i class="far fa-copy" onclick="copyToClipboard(this,&quot;financeContact&quot;)" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    `;
  }
}
