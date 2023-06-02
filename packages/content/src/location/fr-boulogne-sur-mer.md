---
type = "location"
name = "Boulogne-sur-Mer"
region = "Hauts-de-France"
country = "France"
coordinates = [50.7256, 1.61396]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
