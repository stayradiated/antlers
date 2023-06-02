---
type = "location"
name = "Blenheim"
region = "Marlborough"
country = "New Zealand"
coordinates = [-41.514000, 173.960000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
