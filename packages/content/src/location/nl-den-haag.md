---
type = "location"
name = "Den Haag"
region = "South Holland"
country = "Nederland"
coordinates = [52.080000, 4.310000]
countryMapFile = "map/nederland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-10-17-den-haag.md" /%}
{% sojournPartial file="2022-11-19-den-haag.md" /%}
