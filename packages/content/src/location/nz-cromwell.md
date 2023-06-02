---
type = "location"
name = "Cromwell"
region = "Otago"
country = "New Zealand"
coordinates = [-45.040000, 169.200000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
