---
type           = "location"
name           = "Trogir"
region         = "Split-Dalmatia"
country        = "Hrvatska"
coordinates    = [43.516903, 16.251364]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-05-02-trogir.md" /%}
