---
type = "location"
name = "Pitelli, La Spezia"
region = "Liguria"
country = "Italia"
coordinates = [44.0952, 9.885]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-10-06-pitelli.md" /%}
