---
type = "location"
name = "Biscarosse"
region = "Nouvelle-Aquitaine"
country = "France"
countryMapFile = "map/france.md"
coordinates = [44.3942, -1.1628]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-12-02-biscarosse.md" /%}
