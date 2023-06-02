---
type = "location"
name = "Neunkirchen"
region = "Saarland"
country = "Deutschland"
coordinates = [49.35, 7.166667]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-06-08-neunkirchen.md" /%}
