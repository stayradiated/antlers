---
type           = "location"
name           = "Zagreb"
region         = ""
country        = "Hrvatska"
coordinates    = [45.816667, 15.983333]
countryMapFile = "map/hrvatska.md"
---

# {% $name %}

**{% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-02-09-zagreb.md" /%}
{% sojournPartial file="2022-05-13-zagreb.md" /%}
