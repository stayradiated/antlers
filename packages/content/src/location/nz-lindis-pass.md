---
type = "location"
name = "Lindis Pass"
region = "Canterbury"
country = "New Zealand"
coordinates = [-44.69983450423791, 169.49463675267003]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
