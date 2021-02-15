import React from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
// shoe
import Shoe from './Shoe'

const App = () => {
  return (
    <Canvas>
      <Shoe />
      <OrbitControls />
    </Canvas>
  )
}

export default App
