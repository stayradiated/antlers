---
type = "location"
name = "Heidelberg"
region = "Baden-Württemberg"
country = "Deutschland"
coordinates = [49.412196, 8.692522]
countryMapFile = "map/deutschland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2023-01-06-heidelberg.md" /%}
