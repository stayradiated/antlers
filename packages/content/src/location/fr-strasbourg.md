---
type           = "location"
name           = "Strasbourg"
region         = "Grand Est"
country        = "France"
coordinates    = [48.583333, 7.745833]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2023-01-11-strasbourg.md" /%}
