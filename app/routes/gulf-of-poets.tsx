import type {LinksFunction } from '@remix-run/node'
import { useEffect } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'

export const links: LinksFunction = () => ([
{
rel: "stylesheet",
href: PhotoSwipeCSS,
}
])

export default function Index() {
  useEffect(() => {
    const options = {
      gallery: '#gallery',
      children: 'a',
      pswpModule: PhotoSwipe,
    };
    const lightbox = new PhotoSwipeLightbox(options);
    lightbox.init();
  }, [])

  return (
    <main>
      <h1>Gulf of Poets</h1>
      <h2>Pitelli, San Terenzo, Lerici, Torello</h2>
      <div id="gallery">
        <a href="https://cat.stayradiated.com/where-is-george-czabania/images/gulf-of-poets/20221006-184456157.2000.webp" data-pswp-width="2000" data-pswp-height="1500" target="_blank">
          <img src="https://cat.stayradiated.com/where-is-george-czabania/images/gulf-of-poets/20221006-184456157.1000.webp" alt="" />
        </a>
      </div>
      <iframe width="800" height="600" src="https://api.maptiler.com/maps/streets-v2/?key=5u8QuX2Eui9fXwX4mFiv#13.0/44.08411/9.88921"></iframe>
    </main>
  );
}
