---
type = "location"
name = "Madrid"
region = "Comunidad de Madrid"
country = "España"
coordinates = [40.416667, -3.7025]
countryMapFile = "map/espana.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-01-19-madrid.md" /%}
