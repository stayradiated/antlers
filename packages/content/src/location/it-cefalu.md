---
type = "location"
name = "Cefalù"
region = "Sicilia"
country = "Italia"
coordinates = [38.0391, 14.0229]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-10-30-sicilia-cefalu.md" /%}
