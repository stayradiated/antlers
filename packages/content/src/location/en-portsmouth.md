---
type = "location"
name = "Portsmouth"
region = "Hampshire"
country = "England"
coordinates = [50.805833, -1.087222]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-08-18-portsmouth.md" /%}
