---
type = "location"
name = "Pauanui"
region = "Waikato"
country = "New Zealand"
coordinates = [-37.012541, 175.858534]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
