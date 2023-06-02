---
type = "location"
name = "San Sebastian"
region = "País Vasco"
country = "España"
coordinates = [43.321389, -1.985556]
countryMapFile = "map/espana.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-02-02-san-sebastian.md" /%}
