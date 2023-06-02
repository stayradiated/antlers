---
type = "location"
name = "Firenze"
region = "Tuscany"
country = "Italia"
coordinates = [43.7847, 11.2421]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-10-14-firenze.md" /%}
