---
type = "location"
name = "Whangamatā"
region = "Waikato"
country = "New Zealand"
coordinates = [-37.200000, 175.866667]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
