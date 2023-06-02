---
type = "location"
name = "Taupō"
region = "North Island"
country = "New Zealand"
coordinates = [-38.68398383110157, 176.08398769322213]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
