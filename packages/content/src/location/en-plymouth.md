---
type = "location"
name = "Plymouth"
region = "Devon"
country = "England"
coordinates = [50.371389, -4.142222]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-09-19-plymouth.md" /%}
{% sojournPartial file="2021-09-27-plymouth.md" /%}
{% sojournPartial file="2021-10-17-plymouth.md" /%}
{% sojournPartial file="2021-10-23-plymouth.md" /%}
{% sojournPartial file="2022-08-04-plymouth.md" /%}
{% sojournPartial file="2023-01-27-plymouth.md" /%}
