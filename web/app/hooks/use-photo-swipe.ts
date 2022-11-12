import { useEffect } from 'react'

import PhotoSwipe from 'photoswipe'
import PhotoSwipeLightbox from 'photoswipe/lightbox'

const usePhotoSwipe = () => {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.photo-swipe-gallery',
      children: '.photo-swipe-gallery-item',
      pswpModule: PhotoSwipe,
    })

    lightbox.init()
  })
}

export { usePhotoSwipe }
