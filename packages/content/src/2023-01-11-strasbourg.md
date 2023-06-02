---
type     = "sojourn"
arriveAt = "2023-01-11"
departAt = "2023-01-13"
locationFile = "location/fr-strasbourg.md"
image = "2023/01/12/20230112-122304089.jpg"
---

# Strasbourg (January 2023)

{% locationPartial file=$locationFile countryMapFile="map/deutschland.md"
viewPort={ aspectRatio: 0.5, translate: [10, -40], scale: 2 }%}
  {% mapPointPartial file="location/de-nurnberg.md" style="start" /%}
  {% travelPartial file="travel/2023-01-09-frankfurt-to-nurnberg.md" /%}
  {% travelPartial file="travel/2023-01-11-nurnberg-to-strasbourg.md" animated=true /%}
{% /locationPartial %}

{% accomodation
  title="AirBnb in Bischeim"
  review=4
  nights=2
  costPerNight="NZD 185"
  linkHref="https://www.airbnb.com/rooms/741218394725914156"
  linkText="View on AirBnB" %}
Take the L3 bus into Strasbourg (only 15 minutes).
![](https://a0.muscache.com/im/pictures/miso/Hosting-741218394725914156/original/cd5c0421-35f8-49a0-bd0e-84b9870a8ea1.jpeg)
{% /accomodation %}

{% row %}
![](2023/01/12/20230112-093656114.jpg)
![](2023/01/12/20230112-093623265.jpg)
{% /row %}

## Grande Île de Strasbourg

![](2023/01/12/20230112-113456069.jpg)

![](2023/01/12/20230112-113837849.jpg)

{% row %}
![](2023/01/12/20230112-120512344.jpg)
![](2023/01/12/20230112-121906917.jpg)
![](2023/01/12/20230112-121514111.jpg)
{% /row %}

## Cathédrale Notre-Dame de Strasbourg

{% row %}
![](2023/01/12/20230112-123747313.jpg)
![](2023/01/12/20230112-122304089.jpg)
{% /row %}

![](2023/01/12/20230112-123001726.jpg)

## Place Gutenberg

![](2023/01/12/20230112-124414082.jpg)

## La Petite France

{% row %}
![](2023/01/12/20230112-155800688-2.jpg)
![](2023/01/12/20230112-140518590.jpg)
{% /row %}

{% row %}
![](2023/01/12/20230112-140851931.jpg)
![](2023/01/12/20230112-141212370.jpg)
{% /row %}

![](2023/01/12/20230112-141238308.jpg)

## Barrage Vauban

{% row %}
![](unknown/img_2075.jpg)
![](2023/01/12/20230112-142048268.jpg)
{% /row %}

![](2023/01/12/20230112-142911790.jpg)

## Museum of Modern and Contemporary Art

{% row %}
![](2023/01/12/20230112-150235474.jpg)
![](2023/01/12/20230112-151447008.jpg)
![](2023/01/12/20230112-152155533.jpg)
{% /row %}

![](2023/01/12/20230112-152203172.jpg)

{% row %}
![](2023/01/12/20230112-152233730.jpg)
![](2023/01/12/20230112-153228752.jpg)
![](2023/01/12/20230112-153245938.jpg)
{% /row %}

![](2023/01/12/20230112-153312234.jpg)

{% row %}
![](2023/01/12/20230112-152741926.jpg)
![](2023/01/12/20230112-154000910.jpg)
{% /row %}

# On To

{% sojournPartial file="2023-01-13-stuttgart.md" /%}
