---
type = "location"
name = "Hundheim"
region = "Rheinland-Pfalz"
country = "Deutschland"
coordinates = [49.833864, 7.153193]
---

# {% $name %}

**{% $region %}, {% $country %}**

## Location in {% $country %}

{% mapPartial file="map/deutschland.md" %}
  {% mapPoint coordinates=$coordinates label=$name /%}
{% /mapPartial %}

## Sojourns

- [November 2021](/2021-11-11-berlin.md)
