---
type = "location"
name = "Ashburton"
region = "Canterbury"
country = "New Zealand"
coordinates = [-43.905556, 171.745556]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
