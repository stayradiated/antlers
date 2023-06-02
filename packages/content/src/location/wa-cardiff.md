---
type = "location"
name = "Cardiff"
region = "South Glamorgan"
country = "Wales"
coordinates = [51.481667, -3.179167]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
