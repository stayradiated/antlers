---
type = "location"
name = "Lavagnac"
region = "Nouvelle-Aquitaine"
country = "France"
coordinates = [44.819994, -0.137629]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-11-24-lavagnac.md" /%}
{% sojournPartial file="2022-12-23-lavagnac.md" /%}
{% sojournPartial file="2023-01-02-lavagnac.md" /%}
