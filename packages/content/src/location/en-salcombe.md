---
type = "location"
name = "Salcombe"
region = "Devon"
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

{% sojournPartial file="2021-09-24-salcombe.md" /%}
