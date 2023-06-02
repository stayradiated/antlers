---
type = "location"
name = "Reefton"
region = "West Coast"
country = "New Zealand"
coordinates = [-42.115278, 171.863056]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
