---
type = "location"
name = "Palermo"
region = "Sicilia"
country = "Italia"
coordinates = [38.1207, 13.3627]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-10-28-sicilia-palermo.md" /%}
