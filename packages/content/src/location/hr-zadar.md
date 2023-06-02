---
type           = "location"
name           = "Zadar"
region         = "Zadarska Županija"
country        = "Hrvatska"
coordinates    = [44.119444, 15.231944]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-03-07-zadar.md" /%}
