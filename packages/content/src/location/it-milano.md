---
type = "location"
name = "Milano"
region = "Lombardy"
country = "Italia"
coordinates = [45.466944, 9.190000]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
