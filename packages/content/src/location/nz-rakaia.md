---
type = "location"
name = "Rakaia"
region = "Canterbury"
country = "New Zealand"
coordinates = [-43.750000, 172.016667]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
