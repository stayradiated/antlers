---
type = "location"
name = "Catania"
region = "Sicilia"
country = "Italia"
coordinates = [37.5056, 15.0896]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-11-02-sicilia-catania.md" /%}
