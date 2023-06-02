---
type = "location"
name = "Roma"
region = ""
country = "Italia"
coordinates = [41.893333, 12.482778]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
