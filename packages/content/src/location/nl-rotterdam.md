---
type = "location"
name = "Rotterdam"
region = "South Holland"
country = "Nederland"
coordinates = [51.916667, 4.500000]
countryMapFile = "map/nederland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-11-16-rotterdam.md" /%}


