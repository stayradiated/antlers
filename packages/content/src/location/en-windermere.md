---
type = "location"
name = "Windermere"
region = "Cumbria"
country = "England"
coordinates = [54.376, -2.907]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
