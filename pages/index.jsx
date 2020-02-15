import { useRef, useEffect, useState, useCallback } from 'react'
import { useMountedState } from 'react-use'

import * as cocoSsd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs'
import SmoothDiv from '../components/SmoothDiv'
import { useLocalStorage } from 'react-use'

import { data } from '../src/data'
import Button from '../components/Button'

const DEBUG = false

export default () => {
  const videoRef = useRef()
  const modelRef = useRef()

  const isMounted = useMountedState()

  const [predictions, setPredictions] = useState([])

  const detectFrame = useCallback(
    (video, model) => {
      model.detect(video).then(predictions => {
        setPredictions(predictions)
        requestAnimationFrame(() => {
          if (isMounted()) detectFrame(video, model)
        })
      })
    },
    [isMounted],
  )

  const [log, setLog] = useLocalStorage('log', [])

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment',
          },
        })
        .then(stream => {
          videoRef.current.srcObject = stream
          return new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = () => {
              resolve()
            }
          })
        })
      const modelPromise = cocoSsd.load()
      Promise.all([modelPromise, webCamPromise])
        .then(([model, webcam]) => {
          modelRef.current = model
          detectFrame(videoRef.current, model)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [detectFrame])

  return (
    <div style={{ overflowX: 'hidden', width: '100vw' }}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <title>Corona Guard</title>
      <video
        className="size"
        autoPlay
        playsInline
        muted
        ref={videoRef}
        style={{
          position: 'absolute',
        }}
      />
      {predictions
        .sort((x, y) => x.class < y.class)
        .map(({ bbox, ...prediction }, i) => {
          const info = data[prediction.class]
          return info ? (
            <SmoothDiv
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '15px',
                padding: '15px',
                boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(6px)',
                transformOrigin: 'top left',
              }}
              x={bbox[0]}
              y={bbox[1]}
              w={200}
              h={0}
              scale={bbox[2] / 200}
              className="indicator"
              key={`${prediction.class}-${i}`}
            >
              <h2 style={{ margin: '5px 0px' }}>{info.displayName}</h2>
              <h3>
                {info.materialType}{' '}
                {info.recyclable && (
                  <img src="/recycle.png" style={{ height: '25px' }} alt="" />
                )}
                {info.compostable && (
                  <img src="/compost.png" style={{ height: '25px' }} alt="" />
                )}
              </h3>

              <div style={{ borderTop: '1px black solid' }} />
              {info.description.map(x => (
                <p>{x}</p>
              ))}
              <Button
                onClick={() => {
                  alert(`Put ${info.displayName} in Recycle Bin, por favor`)
                  setLog([...log, prediction.class])
                }}
              >
                Add to log
              </Button>
            </SmoothDiv>
          ) : (
            DEBUG && (
              <SmoothDiv
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '15px',
                  padding: '15px',
                  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
                x={bbox[0]}
                y={bbox[1]}
                w={bbox[2]}
                h={bbox[3]}
                className="indicator"
                key={`${prediction.class}-${i}`}
              >
                <p>it is a {prediction.class}</p>
              </SmoothDiv>
            )
          )
        })}
      <style jsx global>{`
        * {
          font-family: Roboto, Arial, sans-serif;
        }

        html,
        body {
          margin: 0;
        }
      `}</style>
    </div>
  )
}
