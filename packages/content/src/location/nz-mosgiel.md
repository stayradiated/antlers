---
type = "location"
name = "Mosgiel"
region = "Otago"
country = "New Zealand"
coordinates = [-45.875000, 170.348611]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
