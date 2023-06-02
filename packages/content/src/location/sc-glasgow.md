---
type = "location"
name = "Glasgow"
region = ""
country = "Scotland"
coordinates = [55.861111, -4.250000]
countryMapFile = "map/scotland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
