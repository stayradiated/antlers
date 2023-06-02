---
type = "location"
name = "Rügen"
region = "Mecklenburg-Vorpommern"
country = "Deutschland"
coordinates = [54.636221, 13.338806]
countryMapFile = "map/deutschland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}
