import { useState } from 'react'
import { useRafLoop } from 'react-use'

const WIEGHT = 0

export default ({ x, y, w, h, scale, style, children }) => {
  const [xx, setX] = useState(x)
  const [yy, setY] = useState(y)
  const [ww, setW] = useState(w)
  const [hh, setH] = useState(h)

  useRafLoop(() => {
    const n = 1 - WIEGHT
    setX(xx * WIEGHT + x * n)
    setY(yy * WIEGHT + y * n)
    setW(ww * WIEGHT + w * n)
    setH(hh * WIEGHT + h * n)
  }, [x, y, w, h])

  return (
    <div
      style={{
        position: 'absolute',
        height: hh || undefined,
        width: ww || undefined,
        transform: `translate(${xx}px, ${yy}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
