---
type = "location"
name = "Fowey"
region = "Cornwall"
country = "England"
coordinates = [50.334, -4.633]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-16-fowey.md" /%}
