---
type = "location"
name = "Timaru"
region = "Canterbury"
country = "New Zealand"
coordinates = [-44.393056, 171.250833]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
