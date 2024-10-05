import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './home.css';
import earth from './earth.jpg'; // Replace with your planet image
import { Link } from 'react-router-dom';

const Home = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create the sphere geometry and texture
        const geometry = new THREE.SphereGeometry(3, 32, 32); // Adjust size for your needs
        const texture = new THREE.TextureLoader().load(earth);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const sphere = new THREE.Mesh(geometry, material);

        scene.add(sphere);

        // Set the camera position lower to show more of the bottom half of the sphere
        camera.position.set(0, 1.5, 5); // Adjusted Y position
        camera.lookAt(0, 0, 0); // Ensure the camera looks at the center of the sphere

        // Position the sphere lower in the scene
        sphere.position.y = -1.5; // Adjust this to move the sphere lower

        // Animate the sphere
        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.005; // Rotate the planet
            sphere.rotation.x += 0.002
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="App">
            <h1 className="header-text">Are you Ready to leave the Earth?</h1>
            <div ref={mountRef} style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} />
            <button className="vr-button">Try in VR</button>
            <Link to="/chooseplanet"><button className="go-button">Let's Go!</button></Link>
        </div>
    );
};

export default Home;
