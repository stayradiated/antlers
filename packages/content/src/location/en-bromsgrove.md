---
type = "location"
name = "Bromsgrove"
region = "Worcestershire"
country = "England"
coordinates = [52.3353, -2.0579]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2023-02-17-bromsgrove.md" /%}
