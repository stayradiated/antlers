---
type = "location"
name = "Cheddar"
region = "Somerset"
country = "England"
coordinates = [51.279, -2.778]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-11-05-cheddar.md" /%}
