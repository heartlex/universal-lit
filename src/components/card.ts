import { html, LitElement } from 'lit';
import { copyToClipboard } from '../utility/Utility';
import { getBillingInfo } from '../api';
import {property, customElement, state} from 'lit/decorators.js';

@customElement('card-component')
export class Card extends LitElement {

  //optional property
  @property()
  cardTitle? = 'billing info';

  @property({attribute: false})
  billingInfoUrl = '';

  @property()
  companyDataList = [{
    name: 'Company',
    companyAddress: {
      address: 'Street number',
      city: 'city',
      postalCode: 12345,
      state: 'State',
    },
    vatNumber: 12345678900
  }];

  @property()
  userId = '';

  @state()
  isLoading = true;

  constructor() {
    super();
    try {
      const resp = getBillingInfo(this.userId);
      console.log(resp);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  }


  //Render the component in the light dom
  createRenderRoot() {
    return this;
  }

  render() {
    if (this.isLoading) {
      return html`
        <div>
          loading
        </div>`;
    } else {
      return html`
        <button class='btn btn-primary' @click='${() => console.log(5)}'>ciao</button>
        <div class='card  my-3'>
          <div class='card-body'>
            <div class='d-flex justify-content-between'>
              <div class='card-title fw-bold fs-5 text-uppercase'>${this.cardTitle}</div>
              <div class='dropdown'>
                <button id='dropdownBillingInfoButton' data-bs-toggle='dropdown' aria-expanded='false'
                        type='button' class='btn btn-xs icon btn-outline-primary'>
                  <i class='far fa-ellipsis-h' aria-hidden='true'></i>
                </button>
                <ul class='dropdown-menu dropdown-menu-end' aria-labelledby='dropdownBillingInfoButton' style=''>
                  <li><a class='dropdown-item' href='#'>Edit billing info</a></li>
                </ul>
              </div>
            </div>
            ${this.companyDataList?.map(
              (companyData, index) =>
                html`
                  <div class='d-flex align-items-center mb-2'>
                    <div class='d-flex'>
                      <strong class='me-1'>Address:</strong>
                      <span id='companyAddress${index}'
                            class='me-3'>${companyData.name} <br> ${companyData.companyAddress.address}  , ${companyData.companyAddress.city} <br> ${companyData.companyAddress.postalCode}
                      , ${companyData.companyAddress.state} <br>${companyData.vatNumber} 
                    </span>
                    </div>
                    <i class='far fa-copy icon-click' @click='${() => copyToClipboard(this, "companyAddress" + index)}'
                       aria-hidden='true'></i>
                  </div>
                  <div class='card-text mb-2'>
                    <strong class='me-1'>Iban:</strong>
                    <span id='iban${index}' class='me-3'>aabbcc12345</span>
                    <i class='far fa-copy' @click='${() => copyToClipboard(this, "iban" + index)}'
                       aria-hidden='true'></i>
                  </div>
                  <div class='card-text mb-2'>
                    <strong class='me-1'>Swift code:</strong>
                    <span id='swift${index}' class='me-3'>swift123456</span>
                    <i class='far fa-copy' @click='${() => copyToClipboard(this, "swift" + index)}'
                       aria-hidden='true'></i>
                  </div>
                  <div class='card-text mb-2'>
                    <strong class='me-1'>Paypal:</strong>
                    <span id='paypal${index}' class='me-3'> paypal@paypal.com</span>
                    <i class='far fa-copy' @click='${() => copyToClipboard(this, "paypal" + index)}'
                       aria-hidden='true'></i>
                  </div>
                  <div class='card-text flex-wrap'>
                    <strong class='me-1'>Finance contact:</strong>
                    <span id='financeContact${index}' class='me-3'> paypal@paypal.com</span>
                    <i class='far fa-copy' @click='${() => copyToClipboard(this, "financeContact" + index)}'
                       aria-hidden='true'></i>
                  </div>
                `
            )}
          </div>
        </div>
      `;
    }
  }
}
