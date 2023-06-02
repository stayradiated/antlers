---
type = "location"
name = "Christchurch"
region = "South Island"
country = "New Zealand"
coordinates = [-43.530000, 172.620278]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
