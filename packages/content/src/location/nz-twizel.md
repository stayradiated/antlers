---
type = "location"
name = "Twizel"
region = "Canterbury"
country = "New Zealand"
coordinates = [-44.250000, 170.100000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
