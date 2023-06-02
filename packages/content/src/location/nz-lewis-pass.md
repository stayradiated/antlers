---
type = "location"
name = "Lewis Pass"
region = "Canterbury"
country = "New Zealand"
coordinates = [-42.517785819815934, 172.38683286221965]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
