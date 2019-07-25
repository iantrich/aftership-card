import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  css,
  CSSResult,
  PropertyValues
} from "lit-element";

import { AftershipCardConfig, HomeAssistant, Tracking } from "./types";
import { repeat } from "lit-html/directives/repeat";
import { fireEvent } from "./fire-event";
import { longPress } from "./long-press";
import { forwardHaptic } from "./haptic";

@customElement("aftership-card")
class AftershipCard extends LitElement {
  @property() public hass?: HomeAssistant;

  @property() private _config?: AftershipCardConfig;

  public setConfig(config: AftershipCardConfig): void {
    if (!config || !config.entity) {
      throw new Error("Invalid configuration");
    }

    this._config = { title: "Aftership", ...config };
  }

  public getCardSize(): number {
    return 6;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config")) {
      return true;
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (oldHass) {
      return (
        oldHass.states[this._config!.entity] !==
        this.hass!.states[this._config!.entity]
      );
    }

    return true;
  }

  protected render(): TemplateResult | void {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="warning">
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const delivered: Tracking[] = stateObj.attributes["trackings"].filter(
      function(tracking) {
        return tracking.status.toLowerCase() === "delivered";
      }
    );

    const intransit: Tracking[] = stateObj.attributes["trackings"].filter(
      function(tracking) {
        return tracking.status.toLowerCase() !== "delivered";
      }
    );

    return html`
      <ha-card>
        <div class="header" @click="${this._moreInfo}">
          ${this._config.title}
        </div>
        ${repeat(
          intransit,
          item => item.tracking_number,
          (item, index) =>
            html`
              <paper-item>
                <paper-item-body>
                  <ha-icon
                    icon="mdi:truck-delivery"
                    .index="${index}"
                    .item="${item}"
                    .title="Expected Delivery: ${new Date(item.expected_delivery).toDateString()}"
                    @ha-click="${this._openLink}"
                    @ha-hold="${this._removeItem}"
                    .longpress="${longPress()}"
                  ></ha-icon>
                </paper-item-body>
                <paper-item-body>
                  <div>
                    ${item.name}
                  </div>
                  <div class="secondary">
                    ${item.tracking_number} (${item.slug})
                  </div>
                </paper-item-body>
                <paper-item-body class="last">
                  <div>
                    ${item.last_checkpoint.location
                      ? this._toTitleCase(item.last_checkpoint.location)
                      : item.status}
                  </div>
                  <div class="secondary">
                    ${new Date(item.last_update).toDateString()}
                  </div>
                </paper-item-body>
              </paper-item>
            `
        )}
        ${repeat(
          delivered,
          item => item.tracking_number,
          (item, index) =>
            html`
              <paper-item>
                <paper-item-body>
                  <ha-icon
                    icon="mdi:package"
                    .index="${index}"
                    .item="${item}"
                    @ha-click="${this._openLink}"
                    @ha-hold="${this._removeItem}"
                    .longpress="${longPress()}"
                  ></ha-icon>
                </paper-item-body>
                <paper-item-body>
                  <div>
                    ${item.name}
                  </div>
                  <div class="secondary">
                    ${item.tracking_number} (${item.slug})
                  </div>
                </paper-item-body>
                <paper-item-body class="last">
                  <div>
                    ${item.status}
                  </div>
                  <div class="secondary">
                    ${new Date(item.last_update).toDateString()}
                  </div>
                </paper-item-body>
              </paper-item>
            `
        )}
        <paper-item>
          <paper-item-body>
            <ha-icon
              class="addButton"
              @click="${this._addItem}"
              icon="hass:plus"
              title="Add Tracking"
            >
            </ha-icon>
          </paper-item-body>
          <paper-item-body>
            <paper-input
              no-label-float
              placeholder="Title"
              @keydown="${this._addKeyPress}"
              id="title"
            ></paper-input>
          </paper-item-body>
          <paper-item-body>
            <paper-input
              no-label-float
              placeholder="Tracking"
              @keydown="${this._addKeyPress}"
              id="tracking"
              required
            ></paper-input>
          </paper-item-body>
        </paper-item>
      </ha-card>
    `;
  }

  private _toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  private _daysUntilDelivery(expected: string): string {
    const daysUntil = Math.floor(
      (Date.parse(expected) - new Date().getMilliseconds()) / 86400000
    );

    return daysUntil + daysUntil > 1 ? "days" : "day";
  }

  private get _title() {
    return this.shadowRoot!.querySelector("#title") as any;
  }

  private get _tracking() {
    return this.shadowRoot!.querySelector("#tracking") as any;
  }

  private _addItem(ev): void {
    const title = this._title;
    const tracking = this._tracking;

    if (tracking.value!.length > 0) {
      this.hass!.callService("aftership", "add_tracking", {
        tracking_number: tracking.value,
        title: title.value
      });

      title.value = "";
      tracking.value = "";

      if (ev) {
        title.focus();
      }
    }
  }

  private _addKeyPress(ev): void {
    if (ev.keyCode === 13) {
      this._addItem(null);
    }
  }

  private _removeItem(ev): void {
    const item = ev.target.item;
    if (!window.confirm("Are you sure you want to remove this tracking?")) {
      return;
    }
    this.hass!.callService("aftership", "remove_tracking", {
      tracking_number: item.tracking_number,
      slug: item.slug
    });
    forwardHaptic(this, "success");
  }

  private _moreInfo(): void {
    fireEvent(this, "hass-more-info", {
      entityId: this._config!.entity
    });
  }

  private _openLink(ev): void {
    const item = ev.target.item;
    window.open(item.link, "mywindow");
  }

  static get styles(): CSSResult {
    return css`
      .warning {
        display: block;
        color: black;
        background-color: #fce588;
        padding: 8px;
      }

      .header {
        /* start paper-font-headline style */
        font-family: "Roboto", "Noto", sans-serif;
        -webkit-font-smoothing: antialiased; /* OS X subpixel AA bleed bug */
        text-rendering: optimizeLegibility;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.012em;
        /* end paper-font-headline style */

        line-height: 40px;
        padding: 8px 16px;
        cursor: pointer;
      }

      paper-input {
        --paper-input-container-underline: {
          display: none;
        }
        --paper-input-container-underline-focus: {
          display: none;
        }
        --paper-input-container-underline-disabled: {
          display: none;
        }
        position: relative;
        top: 1px;
      }

      ha-icon {
        padding: 9px 15px 11px 15px;
        cursor: pointer;
        color: var(--primary-color);
      }

      .side-by-side {
        display: flex;
      }

      .side-by-side > * {
        flex: 1;
        padding-right: 4px;
      }

      paper-item-body {
        padding-right: 16px;
        margin-top: 16px;
        white-space: nowrap;
      }

      table {
        width: 100%;
      }

      .last {
        text-align: right;
      }

      .secondary {
        display: block;
        color: var(--secondary-text-color);
        margin-top: -10px;
        font-size: 10px;
        white-space: nowrap;
        width: 70%;
      }

      table {
        margin-top: -16px;
      }

      #tracking {
        text-align: right;
      }

      .divider {
        height: 1px;
        background-color: var(--divider-color);
        margin: 6px 40px 6px 0px;
      }
    `;
  }
}
