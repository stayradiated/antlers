---
type = "location"
name = "Lido di Ostia"
region = "Lazio"
country = "Italia"
coordinates = [41.733244, 12.278939]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-10-01-lido-di-ostia.md" /%}
