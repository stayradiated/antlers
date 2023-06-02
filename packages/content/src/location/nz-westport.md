---
type = "location"
name = "Westport"
region = "West Coast"
country = "New Zealand"
coordinates = [-41.758056, 171.602222]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
