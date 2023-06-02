---
type = "location"
name = "Paris"
region = "Île-de-France"
country = "France"
coordinates = [48.856613, 2.352222]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/france.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

- November 2017

{% sojournPartial file="2022-05-17-paris.md" /%}
{% sojournPartial file="2022-05-30-paris.md" /%}
{% sojournPartial file="2022-06-13-paris.md" /%}
{% sojournPartial file="2022-07-07-paris.md" /%}
{% sojournPartial file="2022-08-03-paris.md" /%}
{% sojournPartial file="2022-09-19-paris.md" /%}
{% sojournPartial file="2022-09-25-paris.md" /%}
{% sojournPartial file="2023-01-04-paris.md" /%}
