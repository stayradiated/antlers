---
type = "location"
name = "Chester"
region = "Cheshire"
country = "England"
coordinates = [53.19, -2.89]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2023-02-28-chester.md" /%}
