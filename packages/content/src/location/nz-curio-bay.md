---
type = "location"
name = "Curio Bay"
region = "Southland"
country = "New Zealand"
coordinates = [-46.66174048791565, 169.10149809516298]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
