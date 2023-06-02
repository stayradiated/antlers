---
type = "location"
name = "Königstein"
region = "Sachsen"
country = "Deutschland"
coordinates = [50.918889, 14.071389]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
