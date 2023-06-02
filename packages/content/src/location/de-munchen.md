---
type = "location"
name = "München"
region = "Bayern"
country = "Deutschland"
coordinates = [48.1375, 11.575]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
