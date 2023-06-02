---
type = "location"
name = "Leipzig"
region = "Sachsen"
country = "Deutschland"
coordinates = [51.34, 12.375]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-12-08-leipzig.md" /%}
