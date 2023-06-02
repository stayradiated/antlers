---
type = "location"
name = "Gulfe du Morbihan"
region = "Bretagne"
country = "France"
coordinates = [47.6, -2.8]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-05-27-golfe-du-morbihan.md" /%}
