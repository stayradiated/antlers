---
type = "location"
name = "Invercargill"
region = "South Island"
country = "New Zealand"
coordinates = [-46.413056, 168.347500]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
