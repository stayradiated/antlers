---
type           = "location"
name           = "Krapanj"
region         = "Šibenik-Knin"
country        = "Hrvatska"
coordinates    = [43.672222, 15.913889]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-04-13-krapanj.md" /%}
