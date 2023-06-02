---
type         = "sojourn"
arriveAt     = "2023-02-10"
departAt     = "2023-02-13"
locationFile = "location/en-great-malvern.md"
image        = "2023/02/12/20230212-122820115.jpg"
---

# Great Malvern (February 2023)

{% locationPartial file=$locationFile countryMapFile="map/england.md"
viewPort={ aspectRatio: 0.6, translate: [-15, -38], scale: 1.5 }%}
  {% mapPointPartial file="location/en-london.md" style="dot" /%}
  {% travelPartial file="travel/2023-02-10-london-to-great-malvern.md" animated=true /%}
{% /locationPartial %}

{% accomodation
  title="AirBnb in Malvern"
  review=4
  nights=3
  costPerNight="NZD 80"
  linkHref="https://www.airbnb.co.uk/rooms/25867398"
  linkText="View on AirBnB" %}
![](https://a0.muscache.com/im/pictures/819f83ed-edd8-45e2-9e6d-b00e3cc6241a.jpg)
{% /accomodation %}

{% style fullWidth=true %}

{% row %}
![](2023/02/10/20230210-164742655-2.jpg)
![](2023/02/10/20230210-165618492.jpg)
{% /row %}

{% row %}
![](2023/02/11/20230211-164631452.jpg)
![](2023/02/12/20230212-112714716.jpg)
{% /row %}

{% row %}
![](2023/02/11/20230211-122857647.jpg)
![](2023/02/11/20230211-123606508.jpg)
{% /row %}

![](2023/02/12/20230212-115156597.jpg)

{% row %}
![](2023/02/12/20230212-115257865.jpg)
![](2023/02/12/20230212-121936659.jpg)
![](2023/02/12/20230212-122009180.jpg)
{% /row %}

![](2023/02/12/20230212-121806707.jpg)

![](2023/02/11/20230211-164303561.jpg)

![](2023/02/12/20230212-122820115.jpg)

![](2023/02/12/20230212-153954339.jpg)
![](2023/02/13/20230213-104213529.jpg)
{% /style %}

{% place title="Faun" category="Cafè" href="" %}
![](2023/02/11/20230211-141759752.jpg)
{% /place %}

{% place title="Abbey Road Cafè" category="Cafè" href="http://www.abbeyroadcoffee.co.uk/" %}
![Abbey Road Cafè](2023/02/13/20230213-093724894.jpg)
{% /place %}
