---
type = "location"
name = "Wolverley"
region = "Worcestershire"
country = "England"
coordinates = [52.41325, -2.24401]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
