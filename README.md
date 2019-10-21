# 📦 Aftership Card by [@iantrich](https://www.github.com/iantrich)

[![GitHub Release][releases-shield]][releases]
[![GitHub Activity][commits-shield]][commits]
[![custom_updater][customupdaterbadge]][customupdater]
[![License][license-shield]](LICENSE.md)

![Project Maintenance][maintenance-shield]
[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

[![Discord][discord-shield]][discord]
[![Community Forum][forum-shield]][forum]

This card is for [Lovelace](https://www.home-assistant.io/lovelace) on [Home Assistant](https://www.home-assistant.io/) 0.92+ to display your data from the Aftership sensor

Note: Remove trackings by long pressing on the icon

![example](example.png)

## Options

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:aftership-card`
| entity | string | **Required** | [Aftership](https://www.home-assistant.io/components/sensor.aftership/) sensor entity
| title | string | **Optional** | Card title `Aftership`

## Installation

### Step 1

Save [aftership-card](https://github.com/custom-cards/aftership-card/raw/master/dist/aftership-card.js) to `<config directory>/www/aftership-card.js` on your Home Assistant instance.

**Example:**

```bash
wget https://raw.githubusercontent.com/custom-cards/aftership-card/master/dist/aftership-card.js
mv aftership-card.js /config/www/
```

### Step 2

Link `aftership-card` inside your `ui-lovelace.yaml` or Raw Editor in the UI Editor

```yaml
resources:
  - url: /local/aftership-card.js
    type: module
```

### Step 3

Add a custom element in your `ui-lovelace.yaml` or in the UI Editor as a Manual Card

```yaml
type: 'custom:aftership-card'
entity: sensor.aftership
title: Packages
```

[Troubleshooting](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

[buymecoffee]: https://www.buymeacoffee.com/iantrich
[buymecoffeebadge]: https://img.shields.io/badge/buy%20me%20a%20coffee-donate-blue.svg?style=for-the-badge
[commits-shield]: https://img.shields.io/github/commit-activity/y/custom-cards/aftership-card.svg?style=for-the-badge
[commits]: https://github.com/custom-cards/aftership-card/commits/master
[customupdater]: https://github.com/custom-components/custom_updater
[customupdaterbadge]: https://img.shields.io/badge/custom__updater-true-success.svg?style=for-the-badge
[discord]: https://discord.gg/Qa5fW2R
[discord-shield]: https://img.shields.io/discord/330944238910963714.svg?style=for-the-badge
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/t/lovelace-aftership-card/113196
[license-shield]: https://img.shields.io/github/license/custom-cards/aftership-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Ian%20Richardson%20%40iantrich-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/custom-cards/aftership-card.svg?style=for-the-badge
[releases]: https://github.com/custom-cards/aftership-card/releases
