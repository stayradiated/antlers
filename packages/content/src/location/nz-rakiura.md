---
type = "location"
name = "Oban, Rakiura"
region = "Southland"
country = "New Zealand"
coordinates = [-46.9, 168.133333]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
