---
type = "location"
name = "Düsseldorf"
region = "Nordrhein-Westfalen"
country = "Deutschland"
coordinates = [51.233333, 6.783333]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
