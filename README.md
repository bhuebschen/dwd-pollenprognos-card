# dwd-pollenprognos-card

A Lovelace custom card for [custom component DWD Pollenflug](https://github.com/mampfes/hacs_dwd_pollenflug) in Home Assistant, based on [isabellaalstrom/lovelace-pollenprognos-card](https://github.com/isabellaalstrom/lovelace-pollenprognos-card)

<b>You need to manually move the folder `pollen_img` directly inside your `www`
folder for the images to appear, or set the `img_path` configuration value to
the prefix of the URL where the images are reachable.</b>

### Installation:

### [HACS](hacs) (Home Assistant Community Store)

1. Go to HACS page on your Home Assistant instance
1. Add this repository (https://github.com/bhuebschen/dwd-pollenprognos-card) via HACS Custom repositories [How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/)
1. Select `Frontend`
1. Press add icon and search for `DWD Pollenprognos Card`
1. Select DWD Pollenprognos Card repo and install
1. Force refresh the Home Assistant page (<kbd>Ctrl</kbd> + <kbd>F5</kbd> / (<kbd>Shift</kbd> +) <kbd>⌘</kbd> + <kbd>R</kbd>)
1. Add dwd-pollenprognos-card to your page

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=bhuebschen&repository=dwd-pollenprognos-card&category=plugin)

### Manual

1. Download the 'dwd-pollenprognos-card.js' from the latest [release][release-url] (with right click, save link as)
1. Place the downloaded file on your Home Assistant machine in the `config/www` folder (when there is no `www` folder in the folder where your `configuration.yaml` file is, create it and place the file there)
1. In Home Assistant go to `Configuration->Lovelace Dashboards->Resources` (When there is no `resources` tag on the `Lovelace Dashboard` page, enable advanced mode in your account settings, and retry this step)
1. Add a new resource
   1. Url = `/local/dwd-pollenprognos-card.js`
   1. Resource type = `module`
1. Force refresh the Home Assistant page (<kbd>Ctrl</kbd> + <kbd>F5</kbd> / (<kbd>Shift</kbd> +) <kbd>⌘</kbd> + <kbd>R</kbd>)
1. Add dwd-pollenprognos-card to your page

## Example usage
Pick the allergens you want to display.

For ui-mode:
```yaml
type: 'custom:dwd-pollenprognos-card'
region: 121
allergens:
  - ambrosia
  - beifuss
  - birke
  - erle
  - hasel
  - esche
  - roggen
  - graeser
```

For yaml-mode:
```yaml
- type: 'custom:dwd-pollenprognos-card'
  region: 121
  allergens:
    - ambrosia
    - beifuss
    - birke
    - erle
    - hasel
    - esche
    - roggen
    - graeser

```

Usage in a view:
```yaml
title: My awesome Lovelace!
resources:
  - url: /local/dwd-pollenprognos-card.js
    type: module
views:
  title: My view
  cards:
    - type: 'custom:dwd-pollenprognos-card'
      region: 121
      allergens:
        - ambrosia
        - beifuss
        - birke
        - erle
        - hasel
        - esche
        - roggen
        - graeser
```

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:dwd-pollenprognos-card`
| region | string | **Required** | dwd region from which you have sensors - can be found at the end of the created sensors by the dwd-pollenflug-integration
| allergens | list | **Required** | List of allergens for which you have sensors
| columns | number | **Optional** | Define the number of columns per row
| title | boolean | **Optional** | Set to `false` to remove the heading from the card
| show_state | boolean | **Optional** | Set to `false` if you don't want to show the state text under the images.
| threshold | number | **Optional** | Set to a number if you don't want to show allergens below that number (set to `0` to only exclude unknown or i.u.).
| img_path | string | **Optional** | The URL prefix for where to find the images; defaults to `"/local/pollen_img"`)

### Usage:
After installation, you can add the dwd-pollenprognos-card to your Lovelace dashboard using the sample configuration provided above. Customize the card by setting the desired options in your YAML configuration

### Issues & Contributions:
If you encounter any issues or have suggestions for improvements, feel free to [open an issue](https://github.com/bhuebschen/dwd-pollenprognos-card/issues) or submit a pull request.

<!-- Badges -->

[hacs-url]: https://github.com/hacs/integration
[hacs-image]: https://img.shields.io/badge/hacs-custom-orange.svg?style=flat-square
[gh-sponsors-url]: https://github.com/sponsors/bhuebschen
[gh-sponsors-image]: https://img.shields.io/github/sponsors/bhuebschen?style=flat-square

<!-- References -->

[home-assistant]: https://www.home-assistant.io/
[hacs]: https://hacs.xyz
[latest-release]: https://github.com/bhuebschen/dwd-pollenprognos-card/releases/latest
[ha-scripts]: https://www.home-assistant.io/docs/scripts/
[edit-readme]: https://github.com/bhuebschen/dwd-pollenprognos-card/edit/master/README.md
