---
type = "location"
name = "Great Malvern"
region = "Worcestershire"
country = "England"
coordinates = [52.111400, -2.329000]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2023-02-10-great-malvern.md" /%}
