---
type = "location"
name = "Berlin"
region = "Berlin"
country = "Deutschland"
coordinates = [52.520900, 13.409699]
countryMapFile="map/belgium.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-11-11-berlin.md" /%}
{% sojournPartial file="2021-12-22-berlin.md" /%}
{% sojournPartial file="2022-07-19-berlin.md" /%}
