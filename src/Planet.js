import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Planet = ({ image, size = 0.5, isRotate = true }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Keep the aspect ratio square
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background

    // Set renderer size to fit the parent container
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create the sphere geometry and texture
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const texture = new THREE.TextureLoader().load(image);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    camera.position.z = 2.5;

    // Animate the sphere
    const animate = () => {
      requestAnimationFrame(animate);
      if (isRotate) {
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [image, size, isRotate]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Planet;
