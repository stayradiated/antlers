---
type = "location"
name = "Edinburgh"
region = ""
country = "Scotland"
coordinates = [55.953333, -3.189167]
countryMapFile = "map/scotland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
