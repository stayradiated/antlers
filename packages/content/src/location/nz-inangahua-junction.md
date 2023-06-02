---
type = "location"
name = "Inangahua Junction"
region = "West Coast"
country = "New Zealand"
coordinates = [-41.857500, 171.952222]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
