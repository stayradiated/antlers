---
type           = "location"
name           = "Šibenik"
region         = "Šibenik-Knin"
country        = "Hrvatska"
coordinates    = [43.735, 15.890556]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-03-21-sibenik.md" /%}
