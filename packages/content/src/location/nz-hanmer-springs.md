---
type = "location"
name = "Hanmer Springs"
region = "Canterbury"
country = "New Zealand"
coordinates = [-42.516667, 172.816667]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
