---
type = "location"
name = "Magdeburg"
region = "Sachsen-Anhalt"
country = "Deutschland"
coordinates = [52.131667, 11.639167]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
