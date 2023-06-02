---
type = "location"
name = "Nelson"
region = "Nelson City"
country = "New Zealand"
coordinates = [-41.270833, 173.283889]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
