import React from 'react';
import './Hotbar.css';
import Navbar from './navbar';
import "./App.css";
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Points, PointMaterial, Sphere, PointerLockControls } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

function Sky() {
  return (
    <div>
      <Navbar />
      <Canvas camera={{ position: [0, 5, 10] }}>
        <Ground />
        <Stars />
        <PointerLockControls />
      </Canvas>
      <Hotbar />
    </div>
  )
}

function Ground() {
  const radius = 1000;  // Adjust this value to change the size of the planet
  return (
    <Sphere args={[radius, 64, 64]} position={[0, -radius + 0.1, 0]}>
      <meshBasicMaterial attach="material" color="#12071f" />
    </Sphere>
  );
}

function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(1000), { radius: 1000 }))
  // useFrame((state, delta) => {
  //   ref.current.rotation.x -= delta / 10
  //   ref.current.rotation.y -= delta / 15
  // })
  return (
    <group >
      <Points ref={ref} positions={sphere} stride={3}  {...props}>
        <PointMaterial transparent color="#ffa0e0" size={2} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

function Hotbar() {
  return (
    <div className="hotbar-container">
      <button className="hotbar-button">
        <img src="/icons/falling-star.png" alt="draw constellation" className="hotbar-icon" />
      </button>
      <button className="hotbar-button">
        <img src="/icons/cloud.png" alt="cloud" className="hotbar-icon" />
      </button>
      <button className="hotbar-button">
        <img src="/icons/browser.png" alt="browser" className="hotbar-icon" />
      </button>
    </div>
  );
}

export default Sky