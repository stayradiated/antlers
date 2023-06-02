---
type = "location"
name = "Dresden"
region = "Sachsen"
country = "Deutschland"
coordinates = [51.05, 13.74]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
