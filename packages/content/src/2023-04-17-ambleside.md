---
type         = "sojourn"
arriveAt     = "2023-04-17"
departAt     = "2023-04-19"
locationFile = "location/en-ambleside.md"
---

# Ambleside (April 2023)

{% mapPartial file="map/united-kingdom.md" viewPort={ aspectRatio: 0.5, translate: [0, -20], scale: 1.5 }%}
  {% mapPointPartial file="location/sc-stirling.md" style="dot" /%}
  {% mapPointPartial file="location/sc-edinburgh.md" style="dot" /%}
  {% mapPointPartial file="location/en-ambleside.md" /%}
  {% travelPartial file="travel/2023-04-17-stirling-to-ambleside.md" animated=true strokeLength=500 /%}
{% /mapPartial %}

