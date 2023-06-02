---
type = "location"
name = "Nürnberg"
region = "Bayern"
country = "Deutschland"
coordinates = [49.453889, 11.0775]
countryMapFile = "map/deutschland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2023-01-09-nurnberg.md" /%}
