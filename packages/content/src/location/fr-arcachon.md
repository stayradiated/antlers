---
type = "location"
name = "Arcachon"
region = "Nouvelle-Aquitaine"
country = "France"
countryMapFile = "map/france.md"
coordinates = [44.65, -1.17 ]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-06-28-arcachon.md" /%}
