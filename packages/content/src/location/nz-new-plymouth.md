---
type = "location"
name = "New Plymouth"
region = "Taranaki"
country = "New Zealand"
coordinates = [-39.057778, 174.074167]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
