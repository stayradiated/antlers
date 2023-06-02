---
type           = "location"
name           = "Rochefort"
region         = "Nouvelle-Aquitaine"
country        = "France"
coordinates    = [45.9421, -0.9588]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/france.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-12-16-rochefort.md" /%}
