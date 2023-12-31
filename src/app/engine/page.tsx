'use client';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls, useAnimations, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer, MeshStandardMaterial, Mesh } from 'three';
import { Euler } from 'three';
import '../globals.css';
import MyEnvironment from '../Environment';

function EngineContent() {
  const gltf = useLoader(GLTFLoader, './engine.gltf');
  const { scene, animations } = gltf;
  const controlsRef = useRef<any>(null); // Using a more generic type for the ref
  const mixerRef = useRef<AnimationMixer | null>(new AnimationMixer(scene));

  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    scene.position.set(0, -1, 0);
    scene.rotation.copy(new Euler(0, Math.PI / -4, 0));

    scene.traverse((node) => {
      if ((node as Mesh).isMesh) {
        const meshNode = node as Mesh;
        if (Array.isArray(meshNode.material)) {
          meshNode.material.forEach(mat => {
            if (mat instanceof MeshStandardMaterial) {
              mat.roughness = 0.1;
              mat.needsUpdate = true;
            }
          });
        } else if (meshNode.material instanceof MeshStandardMaterial) {
          meshNode.material.roughness = 0.1;
          meshNode.material.needsUpdate = true;
        }
      }
    });

    Object.values(actions).forEach(action => action?.play());

    const currentMixer = mixerRef.current;

    return () => {
      currentMixer?.stopAllAction();
    };
  }, [scene, actions, mixerRef]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <>
      <DreiOrbitControls ref={controlsRef} enableDamping dampingFactor={0.03} autoRotate autoRotateSpeed={0.5} minDistance={3} maxDistance={10} />
      <directionalLight position={[1, 2, 3]} intensity={1} />
      <directionalLight position={[-1, -2, -3]} intensity={1} />
      <primitive object={scene} scale={0.015} />
      <MyEnvironment />
    </>
  );
}

export default function Engine() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <EngineContent />
    </Canvas>
  );
}
