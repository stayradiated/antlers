---
type = "location"
name = "Kaikōura"
region = "Canterbury"
country = "New Zealand"
coordinates = [-42.400000, 173.680000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
