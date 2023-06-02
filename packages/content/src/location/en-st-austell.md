---
type = "location"
name = "St. Austell"
region = "Cornwall"
country = "England"
coordinates = [50.34, -4.79]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-10-10-st-austell.md" /%}
