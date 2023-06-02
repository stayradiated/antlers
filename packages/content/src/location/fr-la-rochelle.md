---
type = "location"
name = "La Rochelle"
region = "Nouvelle-Aquitaine"
country = "France"
coordinates = [46.16, -1.15]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-12-08-la-rochelle.md" /%}
