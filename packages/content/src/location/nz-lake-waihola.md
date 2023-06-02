---
type = "location"
name = "Lake Waihola"
region = "Otago"
country = "New Zealand"
coordinates = [-46.016667, 170.100000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
