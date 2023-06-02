---
type = "location"
name = "Barcelona"
region = "Catalonia"
country = "España"
coordinates = [41.383333, 2.183333]
countryMapFile = "map/espana.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2021-12-29-barcelona.md" /%}
{% sojournPartial file="2022-01-26-barcelona.md" /%}
{% sojournPartial file="2022-02-08-barcelona.md" /%}
