---
type = "location"
name = "Annecy"
region = "Auvergne-Rhône-Alpes"
country = "France"
countryMapFile = "map/france.md"
coordinates = [45.916, 6.133]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-06-10-annecy.md" /%}
