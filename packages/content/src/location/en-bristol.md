---
type = "location"
name = "Bristol"
country = "England"
coordinates = [51.453611, -2.5975]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-11-08-bristol.md" /%}
