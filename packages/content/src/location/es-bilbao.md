---
type = "location"
name = "Bilbao"
region = "País Vasco"
country = "España"
coordinates = [43.256944, -2.923611]
countryMapFile = "map/espana.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-01-27-bilbao.md" /%}
