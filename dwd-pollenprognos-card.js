const LitElement = customElements.get("home-assistant-main")
  ? Object.getPrototypeOf(customElements.get("home-assistant-main"))
  : Object.getPrototypeOf(customElements.get("hui-view"));
const html = LitElement.prototype.html;

class DWDPollenPrognosCard extends LitElement {
  setConfig(config) {
    if (!config.allergens) {
      throw new Error("Please define allergens (list)");
    }
    if (!config.region) {
      throw new Error("Please define region");
    }
    if (config.threshold && typeof config.threshold != "number") {
      throw new Error("Threshold must be a number");
    }
    this.config = config;
  }

  render() {
    if (this.sensors.length < 1) {
      console.log(
        "No sensor data (above threshold or at all), not rendering card."
      );
      return;
    }
    return html` ${this._renderMinimalStyle()} ${this._renderMinimalCard()} `;
  }
  _text(state) {
    switch (state) {
      case "0":
        return "keine Belastung";
      case "0.5":
        return "keine bis geringe Belastung";
      case "1":
        return "geringe Belastung";
      case "1.5":
        return "geringe bis mittlere Belastung";
      case "2":
        return "mittlere Belastung";
      case "2.5":
        return "mittlere bis hohe Belastung";
      case "3":
        return "hohe Belastung";
      case "3.5":
        return "extrem Belastung";
      default:
        return state;
    }
  }

  _renderMinimalCard() {
    return html`
      <ha-card>
        ${this.config.title == null || this.config.title == true
          ? html` <div class="header">
              <div class="name">${this.header}</div>
            </div>`
          : ""}
        <div class="flex-container">
          ${this.sensors.map(
            (sensor) => html`
              <div class="sensor">
                <p class="box">${sensor.allergen_locale}</p>
                <img
                  class="box"
                  src="${this
                    .img_path}/${sensor.allergens.toLowerCase()}_${sensor
                    .forecast.state == "-1" ||
                  sensor.forecast.state == "unknown" ||
                  sensor.forecast.state == "i.u." ||
                  sensor.forecast.state == "unavailable"
                    ? 0
                    : sensor.forecast.state}.svg"
                />
                ${this.config.show_state == true ||
                this.config.show_state == null
                  ? html`<p class="box">
                      ${sensor.forecast.state == "unknown" ||
                      sensor.forecast.state == "i.u."
                        ? sensor.forecast.state
                        : this._text(sensor.forecast.state)}
                    </p>`
                  : ""}
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  _renderMinimalStyle() {
    return html` <style>
      ha-card {
        padding: 16px;
      }
      .header {
        padding: 0;
        @apply --paper-font-headline;
        line-height: 40px;
        color: var(--primary-text-color);
        padding: 4px 0 12px;
      }
      .forecast {
        width: 100%;
        padding: 7px;
        height: 100%;
      }
      td {
        padding: 3px;
        text-align: center;
      }
      .flex-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        text-align: center;
        justify-content: space-evenly;
        align-items: center;
      }
      .sensor {
        margin: 10px;
        flex: 1 1 0;
        flex-direction: column;
        justify-content: space-evenly;
        display: flex;
        align-self: flex-start;
      }
      @supports not (-ms-flex: 1) {
        .flex-container {
          height: auto; /* 2 */
          // min-height: 24em; /* 2 */
        }
      }
      img {
        max-height: 50px;
      }
      .sensor {
        display: block;
        min-width: 16.66%;
        flex: 1;
      }
    </style>`;
  }

  _tryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
      if (str.length > 0) {
        if (!isNaN(str)) {
          retValue = parseInt(str);
        }
      }
    }
    return retValue;
  }
  set hass(hass) {
    this._hass = hass;
    var sensors = [];

    if (this.config.title == null || this.config.title == true) {
      var header_region = this.config.region;
      this.header = "DWD Pollenflug";
    }

    if (this.config.img_path != null) {
      this.img_path = this.config.img_path;
    } else {
      this.img_path = "/local/pollen_img";
    }

    const region = this.config.region;

    const allergens = this.config.allergens;
    for (var i = 0; i < allergens.length; i++) {
      var dict = {};
      dict.allergen_locale =
        allergens[i].charAt(0).toUpperCase() + allergens[i].slice(1);
      var allergen = allergens[i].replace(" / ", "_").toLowerCase();


      dict.allergens = allergen;
      dict.forecast =
        hass.states[`sensor.pollenflug_${allergen}_${region}`];
      if (dict.forecast.state == "unknown") {
        if (dict.forecast === undefined) continue;
      }

      if (this.config.threshold != null) {
        if (
          this._tryParseInt(dict.forecast.state, 0) >= this.config.threshold
        ) {
          sensors.push(dict);
        }
      } else {
        sensors.push(dict);
      }
    }

    this.sensors = sensors;
    this.requestUpdate();
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 1;
  }
}

class HAPC extends DWDPollenPrognosCard {}
customElements.define("dwd-pollenprognos-card", DWDPollenPrognosCard);
