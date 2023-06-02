---
type = "location"
name = "Gloucester"
region = "Gloucestershire"
country = "England"
coordinates = [51.864444, -2.244444]
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
