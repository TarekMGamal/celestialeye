import React from 'react';
import './Hotbar.css';
import "./App.css";
import Sky from './sky';
import Chooseplanet from './chooseplanet';
import Home from './home';
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Points, PointMaterial, Sphere, PointerLockControls } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes and the corresponding components */}
          <Route path="/" element={<Home />} />
          <Route path="/chooseplanet" element={<Chooseplanet />} />
          <Route path="/sky" element={<Sky />} />
        </Routes>
      </div>
    </Router>
  )
}