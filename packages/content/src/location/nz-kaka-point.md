---
type = "location"
name = "Kaka Point"
region = "Otago"
country = "New Zealand"
coordinates = [-46.383333, 169.783333]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
