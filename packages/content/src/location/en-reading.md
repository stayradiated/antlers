---
type = "location"
name = "Reading"
region = "Berkshire"
country = "England"
coordinates = [51.454167, -0.973056]
countryMapFile = "map/england.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2023-02-04-reading.md" /%}
