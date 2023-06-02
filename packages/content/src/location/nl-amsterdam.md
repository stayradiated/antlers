---
type = "location"
name = "Amsterdam"
region = "North Holland"
country = "Nederland"
coordinates = [52.372778, 4.893611]
countryMapFile = "map/nederland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-10-27-amsterdam.md" /%}
