---
type         = "sojourn"
arriveAt     = "2023-03-21"
departAt     = "2023-03-24"
locationFile = "location/en-lancaster.md"
---

# Lancaster (March 2023)

{% mapPartial file="map/england.md" viewPort={ aspectRatio: 0.5, translate: [10, 7], scale: 3.5 }%}
  {% mapPointPartial file="location/en-leyland.md" style="dot" /%}
  {% mapPointPartial file="location/en-lancaster.md"/%}
  {% travelPartial file="travel/2023-03-21-leyland-to-lancaster.md" animated=true strokeWidth=0.5 strokeLength=200 /%}
  {% travelPartial file="travel/2023-03-20-crewe-to-leyland.md" strokeWidth=0.5 strokeLength=200 /%}
{% /mapPartial %}

{% video src="https://youtu.be/4z67BCDpuM8" /%}

![](2023/03/23/20230323-144056055.jpg)
