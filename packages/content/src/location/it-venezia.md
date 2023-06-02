---
type = "location"
name = "Venezia"
region = "Veneto"
country = "Italia"
coordinates = [45.4375, 12.335833]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
