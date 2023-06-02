---
type = "location"
name = "Lochranza"
region = "Ayrshire and Arran"
country = "Scotland"
coordinates = [55.705, -5.295]
countryMapFile = "map/scotland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
