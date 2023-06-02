---
type = "location"
name = "Dieppe"
region = "Normandy"
country = "France"
coordinates = [49.92, 1.08]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-09-23-dieppe.md" /%}
