---
type = "location"
name = "Mevagissey"
region = "Cornwall"
country = "England"
coordinates = [50.2702, -4.7874]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-15-mevagissey.md" /%}
