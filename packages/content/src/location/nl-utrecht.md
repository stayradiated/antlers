---
type = "location"
name = "Utrecht"
region = ""
country = "Nederland"
coordinates = [52.083333, 5.116667]
countryMapFile = "map/nederland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
