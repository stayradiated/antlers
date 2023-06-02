---
type = "location"
name = "Stuttgart"
region = "Baden-Württemberg"
country = "Deutschland"
coordinates = [48.7775, 9.18]
countryMapFile = "map/deutschland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2023-01-13-stuttgart.md" /%}
