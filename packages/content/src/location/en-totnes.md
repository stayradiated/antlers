---
type = "location"
name = "Totnes"
region = "Devon"
country = "England"
coordinates = [50.432, -3.684]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-25-totnes.md" /%}
