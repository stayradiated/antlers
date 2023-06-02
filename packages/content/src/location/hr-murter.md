---
type           = "location"
name           = "Jezera"
region         = "Šibenik-Knin"
country        = "Hrvatska"
coordinates    = [43.785853, 15.643599]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-04-16-jezera.md" /%}
