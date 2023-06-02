---
type = "location"
name = "Frankfurt"
region = "Hesse"
country = "Deutschland"
coordinates = [50.110556, 8.682222]
countryMapFile = "map/deutschland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-11-30-frankfurt.md" /%}
