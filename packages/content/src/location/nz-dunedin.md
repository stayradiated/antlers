---
type = "location"
name = "Dunedin"
region = "Otago"
country = "New Zealand"
coordinates = [-45.874167, 170.503611]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
