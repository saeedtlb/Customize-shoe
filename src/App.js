import React, { useReducer, Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { ContactShadows } from '@react-three/drei/core/ContactShadows'
import { Environment } from '@react-three/drei/core/Environment'
import { HexColorPicker } from 'react-colorful'
// Shoe
import Shoe from './Shoe'
// Reducer
import reducer from './reducer'
// Custom cursor
import useCursor from './useCursor'

const initialState = {
  current: null,
  selected: null,
  items: {
    laces: '#ffffff',
    mesh: '#ffffff',
    caps: '#ffffff',
    inner: '#ffffff',
    sole: '#ffffff',
    stripes: '#ffffff',
    band: '#ffffff',
    patch: '#ffffff'
  }
}

const ColorPicker = ({ state, dispatch }) => {
  return (
    <div className="color_picker">
      <HexColorPicker
        color={state.items[state.selected]}
        onChange={(color) =>
          dispatch({
            type: 'COLOR',
            color
          })
        }
      />
      <h1>{state.selected}</h1>
    </div>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // custom cursor
  useCursor(state)

  return (
    <>
      {state.selected ? <ColorPicker state={state} dispatch={dispatch} /> : null}

      <Canvas camera={{ position: [0, 0, 2.75] }}>
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 25, 20]} penumbra={1} intensity={0.3} />
        <Suspense fallback={null}>
          <Shoe state={state} dispatch={dispatch} />
          <Environment files="royal_esplanade.hdr" path="/" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={2}
            far={1}
          />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
    </>
  )
}

export default App
