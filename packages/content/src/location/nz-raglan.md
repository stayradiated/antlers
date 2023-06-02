---
type = "location"
name = "Raglan"
region = "Waikato"
country = "New Zealand"
coordinates = [-37.82603951429149, 174.80153847780377]
countryMapFile = "map/new-zealand.md"
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file=$countryMapFile %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns
