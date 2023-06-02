---
type = "location"
name = "Ventnor"
region = "Isle of Wight"
country = "England"
coordinates = [50.5976, -1.2084]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-08-12-ventnor.md" /%}
