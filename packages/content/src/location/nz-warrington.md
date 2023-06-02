---
type = "location"
name = "Warrington"
region = "Otago"
country = "New Zealand"
coordinates = [-45.710100, 170.594100]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
