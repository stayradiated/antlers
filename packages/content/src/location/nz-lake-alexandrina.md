---
type = "location"
name = "Lake Alexandrina"
region = "Canterbury"
country = "New Zealand"
coordinates = [-43.93668153973051, 170.46073378148617]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
