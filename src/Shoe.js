import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { useFrame } from 'react-three-fiber'

const Shoe = ({ state, dispatch }) => {
  const groupRef = useRef()
  const { nodes, materials } = useGLTF('/shoe-draco.glb')

  const shoeParts = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'NAME',
      name: e.intersections.length !== 0 ? e.object.material.name : null
    })
  }

  const select = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'SELECT',
      name: e.object ? e.object.material.name : null
    })
  }

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    groupRef.current.rotation.x = Math.cos(t / 4) / 8
    groupRef.current.rotation.y = Math.sin(t / 4) / 8
    groupRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  return (
    <group
      ref={groupRef}
      dispose={null}
      onPointerOver={shoeParts}
      onPointerOut={shoeParts}
      onPointerDown={select}
      onPointerMissed={select}>
      <mesh material={materials.laces} geometry={nodes.shoe.geometry} material-color={state.items.laces} />
      <mesh material={materials.mesh} geometry={nodes.shoe_1.geometry} material-color={state.items.mesh} />
      <mesh material={materials.caps} geometry={nodes.shoe_2.geometry} material-color={state.items.caps} />
      <mesh material={materials.inner} geometry={nodes.shoe_3.geometry} material-color={state.items.inner} />
      <mesh material={materials.sole} geometry={nodes.shoe_4.geometry} material-color={state.items.sole} />
      <mesh material={materials.stripes} geometry={nodes.shoe_5.geometry} material-color={state.items.stripes} />
      <mesh material={materials.band} geometry={nodes.shoe_6.geometry} material-color={state.items.band} />
      <mesh material={materials.patch} geometry={nodes.shoe_7.geometry} material-color={state.items.patch} />
    </group>
  )
}

export default Shoe
