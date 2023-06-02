---
type = "location"
name = "Gent"
region = "Vlaanderen"
country = "Belgium"
coordinates = [51.053611, 3.725278]
countryMapFile="map/belgium.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-07-13-gent.md" /%}
