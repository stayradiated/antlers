---
type = "location"
name = "Mt. Somers"
region = "Canterbury"
country = "New Zealand"
coordinates = [-43.716667, 171.4]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
