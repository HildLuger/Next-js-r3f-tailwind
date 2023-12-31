'use client';
import React, { useEffect, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { TextureLoader, MeshStandardMaterial, RepeatWrapping, Euler } from 'three';
import '../globals.css';
import MyEnvironment from '../Environment';

function GlobeModel() {
    const gltf = useGLTF('./globe.gltf'); // Load the GLTF model
    const colorMap = useLoader(TextureLoader, '/color_globe.jpg'); // Load your color texture
    const bumpMap = useLoader(TextureLoader, '/bump_globe.jpg'); // Load your bump map texture
    const roughnessMap = useLoader(TextureLoader, '/ocean_mask.png'); // Load your roughness map texture

    // Flip the textures vertically
    [colorMap, bumpMap, roughnessMap].forEach(texture => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(1, -1); // Flipping the texture vertically
    });

    const material = useMemo(() => new MeshStandardMaterial({
        map: colorMap,          // Apply color texture
        roughnessMap: roughnessMap, // Apply roughness map
        roughness: 0.4, 
        metalness: 0.1,         // Adjust metalness
        bumpMap: bumpMap,       // Apply bump map
        bumpScale: 10,          // Adjust the intensity of the bump map
    }), [colorMap, bumpMap, roughnessMap]);

    useEffect(() => {
        if (gltf && gltf.scene) {
            gltf.scene.traverse((node) => {
                if ((node as THREE.Mesh).isMesh) {
                    (node as THREE.Mesh).material = material;
                }
            });
            gltf.scene.rotation.copy(new Euler(0, 0, 0)); // Adjust these values as needed
        }
    }, [gltf, material]);

    return <primitive object={gltf.scene} />;
}

export default function Globe() {
    return (
        <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[-10, 10, -5]} intensity={0} />
            <GlobeModel />
            <OrbitControls enableDamping dampingFactor={0.03} autoRotate autoRotateSpeed={2} minDistance={1.75} maxDistance={3} />
            <MyEnvironment />
        </Canvas>
    );
}
