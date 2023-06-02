---
type = "location"
name = "Liège"
region = "Wallonia"
country = "Belgium"
coordinates = [50.639722, 5.570556]
countryMapFile="map/belgium.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-07-15-liege.md" /%}
