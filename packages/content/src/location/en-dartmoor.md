---
type = "location"
name = "Dartmoor"
region = "Devon"
country = "England"
coordinates = [50.483089, -3.872327]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-22-dartmoor.md" /%}
