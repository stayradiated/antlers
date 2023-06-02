---
type           = "location"
name           = "Saintes"
region         = "Nouvelle-Aquitaine"
country        = "France"
coordinates    = [45.7464, -0.6333]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/france.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-12-20-saintes.md" /%}
