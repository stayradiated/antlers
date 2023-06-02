---
type = "location"
name = "Eskdale"
region = "Hawke's Bay Region"
country = "New Zealand"
coordinates = [-39.368033, 176.814578]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
