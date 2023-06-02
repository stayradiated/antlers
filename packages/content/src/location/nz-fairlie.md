---
type = "location"
name = "Fairlie"
region = "Canterbury"
country = "New Zealand"
coordinates = [-44.100000, 170.833333]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
