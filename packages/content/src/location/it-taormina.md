---
type = "location"
name = "Taormina"
region = "Sicilia"
country = "Italia"
coordinates = [37.8552, 15.2908]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-11-05-sicilia-taormina.md" /%}
