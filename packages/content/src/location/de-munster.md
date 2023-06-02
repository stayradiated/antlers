---
type = "location"
name = "Münster"
region = "Nordrhein-Westfalen"
country = "Deutschland"
coordinates = [51.9625, 7.625556]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
