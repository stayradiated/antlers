---
type           = "location"
name           = "Komiža, Vis"
region         = "Split-Dalmatia"
country        = "Hrvatska"
coordinates    = [43.05, 16.1]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-04-23-komiza.md" /%}
