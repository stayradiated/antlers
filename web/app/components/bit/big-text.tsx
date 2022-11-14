import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import { createCX } from '~/lib/class-name'

const cx = createCX('bit', 'BigText')

const removeDiacritics = (input: string): string => {
  return input.replace(/Ŝ/g, 'S').replace(/ŝ/g, 's')
}

// Suppress `useLayoutEffect` warning when rendering on the server
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useIsoLayoutEffect =
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
    ? useLayoutEffect
    : useEffect

type BigTextProps = {
  text: string
}

const BigText = (props: BigTextProps) => {
  const { text } = props
  const [fontSize, setFontSize] = useState<number>(20)

  const paddingH = 1.3
  const paddingV = 1.5

  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLSpanElement>(null)

  const [parentWidth, setParentWidth] = useState(0)
  const [parentHeight, setParentHeight] = useState(0)

  useResizeObserver(parentRef, (entry) => {
    setParentWidth(entry.contentRect.width)
    setParentHeight(entry.contentRect.width)
  })

  const onBodyResize = () => {
    if (parentRef.current && childRef.current) {
      const parentWidth = parentRef.current.offsetWidth / paddingH
      const parentHeight = parentRef.current.offsetHeight / paddingV

      const childWidth = childRef.current.offsetWidth
      const childHeight = childRef.current.offsetHeight

      const optimalWidth = (fontSize / childWidth) * parentWidth
      const optimalHeight = (fontSize / childHeight) * parentHeight

      const nextFontSize = Math.min(optimalWidth, optimalHeight)

      setFontSize(nextFontSize)
    }
  }

  useIsoLayoutEffect(() => {
    onBodyResize()
  }, [parentWidth, parentHeight])

  return (
    <h2 className={cx('container')} ref={parentRef}>
      <span
        className={cx('inner')}
        ref={childRef}
        style={{ fontSize: `${fontSize}px` }}
      >
        {removeDiacritics(text)}
      </span>
    </h2>
  )
}

export { BigText }
