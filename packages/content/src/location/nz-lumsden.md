---
type = "location"
name = "Lumsden"
region = "Southland"
country = "New Zealand"
coordinates = [-45.733333, 168.450000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
