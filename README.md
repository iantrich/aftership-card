# Aftership Card

This card give you a list shipment information generated with this [custom sensor](https://github.com/custom-components/sensor.aftership).\

## Options

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:aftership-card`
| entity | string | **Required** | The entity_id of the entity you want to show.
| title | string | **Optional** | Add a custom title to the card.

## Installation

### Step 1

Install `aftership-card` by copying `aftership-card.js`from this repo to `<config directory>/www/aftership-card.js` on your Home Assistant instanse.

**Example:**

```bash
wget https://raw.githubusercontent.com/custom-cards/aftership-card/master/aftership-card.js
mv aftership-card.js /config/www/
```

### Step 2

Link `aftership-card` inside you `ui-lovelace.yaml`.

```yaml
resources:
  - url: /local/aftership-card.js?v=0
    type: js
```

### Step 3

Add a custom element in your `ui-lovelace.yaml`

```yaml
      - type: custom:aftership-card
        entity: sensor.aftership
```

![example](example.png)
