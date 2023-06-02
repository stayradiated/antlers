---
type           = "location"
name           = "Primoŝten"
region         = "Šibenik-Knin"
country        = "Hrvatska"
coordinates    = [43.583333, 15.933333]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-04-14-primosten.md" /%}
