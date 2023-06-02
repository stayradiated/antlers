---
type = "location"
name = "Casablanca"
region = ""
country = "Morocco"
coordinates = [33.533333, -7.583333]
countryMapFile = "map/morocco.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
