---
type = "location"
name = "Saint Arnaud"
region = "Tasman District"
country = "New Zealand"
coordinates = [-41.803333, 172.845000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
