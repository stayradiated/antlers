---
type = "location"
name = "València"
region = "Comunitat Valenciana"
country = "España"
coordinates = [39.466667, -0.375]
countryMapFile = "map/espana.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-01-12-valencia.md" /%}
