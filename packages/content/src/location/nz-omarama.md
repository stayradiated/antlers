---
type = "location"
name = "Omarama"
region = "Canterbury"
country = "New Zealand"
coordinates = [-44.483333, 169.966667]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
