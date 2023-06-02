---
type = "location"
name = "Aoraki"
region = "Canterbury"
country = "New Zealand"
coordinates = [-43.733333, 170.095556]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
