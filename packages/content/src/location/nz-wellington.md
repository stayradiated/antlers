---
type = "location"
name = "Wellington"
region = "Wellington"
country = "New Zealand"
coordinates = [-41.288889, 174.777222]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
