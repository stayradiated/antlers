---
type = "location"
name = "Picton"
region = "Marlborough"
country = "New Zealand"
coordinates = [-41.292778, 174.005833]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
