---
type = "location"
name = "London"
country = "England"
coordinates = [51.507222, -0.1275]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-09-16-london.md" /%}
{% sojournPartial file="2021-10-07-london.md" /%}
{% sojournPartial file="2022-08-22-london.md" /%}
{% sojournPartial file="2022-09-12-london.md" /%}
{% sojournPartial file="2023-01-25-london.md" /%}
{% sojournPartial file="2023-02-06-london.md" /%}
