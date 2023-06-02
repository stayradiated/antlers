---
type = "location"
name = "Köln"
region = "Nordrhein-Westfalen"
country = "Deutschland"
coordinates = [50.936389, 6.952778]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

- [November 2021](/2022-07-18-koln.md)
