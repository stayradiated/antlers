---
type = "location"
name = "Rabat"
region = ""
country = "Morocco"
coordinates = [34.020882, -6.841650]
countryMapFile = "map/morocco.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
