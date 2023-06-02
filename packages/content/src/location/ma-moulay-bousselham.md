---
type = "location"
name = "Moulay Bousselham"
region = "Kénitra"
country = "Morocco"
coordinates = [34.8786, -6.29333]
countryMapFile = "map/morocco.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
