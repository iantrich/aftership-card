# 📦 Aftership Card

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

[![Discord][discord-shield]][discord]
[![Community Forum][forum-shield]][forum]

[![Twitter][twitter]][twitter]
[![Github][github]][github]

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/zJtVxUAgH)

This card is for [Lovelace](https://www.home-assistant.io/lovelace) on [Home Assistant](https://www.home-assistant.io/) 0.92+ to display your data from the Aftership sensor

Note: Remove trackings by long pressing on the icon

![example](example.png)

## Installation

Use [HACS](https://hacs.xyz) or follow this [guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

```yaml
resources:
  url: /local/aftership-card.js
  type: module
```

## Options

| Name   | Type   | Requirement  | Description                                                                           |
| ------ | ------ | ------------ | ------------------------------------------------------------------------------------- |
| type   | string | **Required** | `custom:aftership-card`                                                               |
| entity | string | **Required** | [Aftership](https://www.home-assistant.io/components/sensor.aftership/) sensor entity |
| title  | string | **Optional** | Card title `Aftership`                                                                |

## Usage

```yaml
type: 'custom:aftership-card'
entity: sensor.aftership
title: Packages
```

[Troubleshooting](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

[commits-shield]: https://img.shields.io/github/commit-activity/y/iantrich/aftership-card.svg?style=for-the-badge
[commits]: https://github.com/iantrich/aftership-card/commits/master
[discord]: https://discord.gg/Qa5fW2R
[discord-shield]: https://img.shields.io/discord/330944238910963714.svg?style=for-the-badge
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/t/lovelace-aftership-card/113196
[license-shield]: https://img.shields.io/github/license/iantrich/aftership-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Ian%20Richardson%20%40iantrich-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/iantrich/aftership-card.svg?style=for-the-badge
[releases]: https://github.com/iantrich/aftership-card/releases
[twitter]: https://img.shields.io/twitter/follow/iantrich.svg?style=social
[github]: https://img.shields.io/github/followers/iantrich.svg?style=social
