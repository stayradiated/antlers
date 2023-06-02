---
type = "location"
name = "Terrasini"
region = "Sicilia"
country = "Italia"
coordinates = [38.1534, 13.0826]
countryMapFile = "map/italia.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-11-08-sicilia-terrasini.md" /%}
