---
type = "location"
name = "Rostock"
region = "Mecklenburg-Vorpommern"
country = "Deutschland"
coordinates = [54.083333, 12.133333]
countryMapFile = "map/deutschland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
