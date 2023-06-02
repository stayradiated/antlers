---
type = "location"
name = "Tangier"
region = ""
country = "Morocco"
coordinates = [35.776667, -5.803889]
countryMapFile = "map/morocco.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
