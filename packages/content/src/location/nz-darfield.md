---
type = "location"
name = "Darfield"
region = "Canterbury"
country = "New Zealand"
coordinates = [-43.483333, 172.116667]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
