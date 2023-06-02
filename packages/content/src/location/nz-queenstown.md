---
type = "location"
name = "Queenstown"
region = "Otago"
country = "New Zealand"
coordinates = [-45.031111, 168.662500]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
