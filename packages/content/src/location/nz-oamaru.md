---
type = "location"
name = "Oamaru"
region = "Otago"
country = "New Zealand"
coordinates = [-45.098000, 170.971000]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
