---
type = "location"
name = "Waipara"
region = "Canterbury"
country = "New Zealand"
coordinates = [-43.066667, 172.750000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
