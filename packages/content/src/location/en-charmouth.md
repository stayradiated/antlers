---
type = "location"
name = "Charmouth"
region = "Dorset"
country = "England"
coordinates = [50.7368, -2.9026]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-30-charmouth.md" /%}
