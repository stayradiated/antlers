---
type = "location"
name = "Southampton"
region = "Hampshire"
country = "England"
coordinates = [50.237, -3.782]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-08-08-southampton.md" /%}
