---
type = "location"
name = "Rolleston"
region = "Canterbury"
country = "New Zealand"
coordinates = [-43.583333, 172.383333]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
