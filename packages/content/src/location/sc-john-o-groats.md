---
type = "location"
name = "John o' Groats"
region = "Highland"
country = "Scotland"
coordinates = [58.64, -3.07]
countryMapFile = "map/scotland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
