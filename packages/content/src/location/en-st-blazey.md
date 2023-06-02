---
type = "location"
name = "St Blazey"
region = "Cornwall"
country = "England"
coordinates = [50.361, -4.716 ]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
