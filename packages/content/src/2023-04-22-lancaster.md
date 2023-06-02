---
type         = "sojourn"
arriveAt     = "2023-04-22"
departAt     = "2023-04-24"
locationFile = "location/en-lancaster.md"
---

# Lancaster (April 2023)

{% mapPartial file="map/england.md" viewPort={ aspectRatio: 0.5, translate: [10, 12], scale: 3 }%}
  {% mapPointPartial file="location/en-ambleside.md" style="dot"/%}
  {% mapPointPartial file="location/en-windermere.md" style="dot"/%}
  {% mapPointPartial file="location/en-lancaster.md"/%}
  {% travelPartial file="travel/2023-04-22-ambleside-to-lancaster.md" animated=true strokeWidth=1 strokeLength=200  /%}
{% /mapPartial %}
