---
type = "location"
name = "Oban"
region = "Argyll and Bute"
country = "Scotland"
coordinates = [56.412000, -5.472000]
countryMapFile = "map/scotland.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
