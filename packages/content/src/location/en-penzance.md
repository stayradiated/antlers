---
type = "location"
name = "Penzance"
region = "Cornwall"
country = "England"
coordinates = [50.119, -5.537]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-13-penzance.md" /%}
