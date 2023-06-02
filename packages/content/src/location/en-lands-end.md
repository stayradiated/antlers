---
type = "location"
name = "Land's End"
region = "Cornwall"
country = "England"
coordinates = [50.068611, -5.716111]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
