---
type = "location"
name = "Sainte-Terre"
region = "Nouvelle-Aquitaine"
country = "France"
coordinates = [44.8289, -0.1114]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-07-02-sainte-terre.md" /%}
