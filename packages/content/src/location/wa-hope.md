---
type = "location"
name = "Hope"
region = "Flintshire"
country = "Wales"
coordinates = [53.10774, -3.03664]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
