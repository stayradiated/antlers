---
type = "location"
name = "Polruan"
region = "Cornwall"
country = "England"
coordinates = [50.3273, -4.6333]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-09-polruan.md" /%}
