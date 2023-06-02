---
type = "location"
name = "Bordeaux"
region = "Nouvelle-Aquitaine"
country = "France"
countryMapFile = "map/france.md"
coordinates = [44.84, -0.58]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-06-24-bordeaux.md" /%}
{% sojournPartial file="2022-12-05-bordeaux.md" /%}
