---
type           = "location"
name           = "Sali"
region         = "Zadarska Županija"
country        = "Hrvatska"
coordinates    = [43.933333, 15.166667]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-03-14-sali.md" /%}
