---
type = "location"
name = "Lake Tekapo"
region = "Canterbury"
country = "New Zealand"
coordinates = [-44.004, 170.477]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
