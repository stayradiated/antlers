---
type = "location"
name = "Murchison"
region = "Tasman District"
country = "New Zealand"
coordinates = [-41.800000, 172.333333]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
