---
type = "location"
name = "Weston-super-Mare"
region = "Somerset"
country = "England"
coordinates = [51.346, -2.977]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-11-05-weston-super-mare.md" /%}
