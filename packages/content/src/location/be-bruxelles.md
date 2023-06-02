---
type = "location"
name = "Bruxelles"
region = "Bruxelles-Capitale"
country = "Belgium"
coordinates = [50.846667, 4.3525]
countryMapFile="map/belgium.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
