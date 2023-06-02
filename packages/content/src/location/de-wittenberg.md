---
type = "location"
name = "Wittenberg"
region = "Sachsen-Anhalt"
country = "Deutschland"
coordinates = [51.8671, 12.6484]
countryMapFile = "map/deutschland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-12-15-wittenberg.md" /%}
