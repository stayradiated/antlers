---
type = "location"
name = "Wānaka"
region = "Otago"
country = "New Zealand"
coordinates = [-44.700000, 169.150000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
