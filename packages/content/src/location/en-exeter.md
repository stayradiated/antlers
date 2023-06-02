---
type = "location"
name = "Exeter"
region = "Devon"
country = "England"
coordinates = [50.725556, -3.526944]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-01-exeter.md" /%}
