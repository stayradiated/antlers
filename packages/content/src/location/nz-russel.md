---
type = "location"
name = "Russell"
region = "Northland"
country = "New Zealand"
coordinates = [-35.261667, 174.122222]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
