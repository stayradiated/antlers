---
type           = "location"
name           = "Toulouse"
region         = "Occitanie"
country        = "France"
coordinates    = [43.6045, 1.444]
countryMapFile = "map/france.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

{% sojournPartial file="2022-12-30-toulouse.md" /%}
