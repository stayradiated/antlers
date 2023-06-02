---
type = "location"
name = "Rotorua"
region = "Bay of Plenty"
country = "New Zealand"
coordinates = [-38.137778, 176.251389]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
