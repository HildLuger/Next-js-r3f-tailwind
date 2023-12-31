'use client'

import '../globals.css';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Material, Vector3, Object3D } from 'three';
import { gsap } from 'gsap';
import MyEnvironment from '../Environment';


function SkullContent() {
    const gltf = useGLTF('./plane.gltf');
    const scene = gltf.scene;
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);

    const [activeTarget, setActiveTarget] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showContent, setShowContent] = useState<{ [key: string]: boolean }>({ '1': false, '2': false, '3': false });

    const initialTarget = useMemo(() => new Vector3(), []);
    const target1 = useMemo(() => new Vector3(1.3, -0.6, 2), []);
    const target2 = useMemo(() => new Vector3(1.6, -0.3, -2.9), []);
    const target3 = useMemo(() => new Vector3(3.3, 0.3, 0), []);

    const cameraPositions = useMemo(() => [
        new Vector3(2, 1.2, 3.5),
        new Vector3(-5, 1, -3),
        new Vector3(5, -1, 3.5)
    ], []);

    useEffect(() => {
        if (scene) {
            scene.traverse((node: Object3D) => {
                if ((node as any).isMesh) {
                    const mesh = node as Mesh;
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach(modifyMaterial);
                    } else {
                        modifyMaterial(mesh.material);
                    }
                }
            });
            scene.position.set(0, -1.2, 0);
        }
    }, [scene]);

    const modifyMaterial = (material: Material) => {
        if (material instanceof MeshPhysicalMaterial || material instanceof MeshStandardMaterial) {
            const physicalMat = material as MeshPhysicalMaterial;
            physicalMat.roughness = 0.2;
            physicalMat.metalness = 0.1;
        }
    };

    const handleDotClick = (index: number) => {
        const indexKey = index.toString();

        if (showContent[indexKey]) {
            setShowContent(prevState => ({ ...prevState, [indexKey]: false }));
        } else {
            setIsAnimating(true);
            const cameraPosition = cameraPositions[index - 1];
            const target = [target1, target2, target3][index - 1];

            gsap.to(camera.position, {
                duration: 4,
                ...cameraPosition,
                ease: "power4.out",
                onComplete: () => setIsAnimating(false)
            });

            gsap.to(controlsRef.current.target, {
                duration: 2,
                ...target,
                ease: "power4.out"
            });

            setShowContent(prevState => ({ ...prevState, [indexKey]: true }));

            setTimeout(() => setShowContent(prevState => ({ ...prevState, [indexKey]: false })), 20000);
        }
    };

    

    useFrame(() => {
        if (controlsRef.current && activeTarget === null) {
            controlsRef.current.target.lerp(initialTarget, 0.05);
            controlsRef.current.update();
        }
    });

    return (
        <>
            <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.03} autoRotate autoRotateSpeed={0.5} minDistance={3} maxDistance={10} />

            <primitive object={scene} scale={0.0025} />
            
            {/* HTML Content for target1 */}
            <Html position={target1.toArray()}>
                <div className={`dot w-5 h-5 bg-red-500 rounded-full border-4 border-white transition-opacity cursor-pointer ${showContent["1"] ? 'opacity-100' : 'opacity-20'}`} onClick={() => handleDotClick(1)}>
                    <div className={`text1 ml-5 bg-white bg-opacity-30 p-5 rounded-lg backdrop-blur-md w-72 transform -translate-y-1/2 transition-opacity duration-5000 ${showContent["1"] ? 'opacity-100' : 'opacity-0'}`}>
                    <h4 className = 'title'>Aileron</h4><br />
            <p> An aileron (French for &quot;little wing&quot; or &quot;fin&quot;) is a hinged flight control surface usually forming part of the trailing edge of each wing of a fixed-wing aircraft. </p>
                    </div>
                </div>
            </Html>

            <Html position={target2.toArray()}>
            <div className={`dot w-5 h-5 bg-red-500 rounded-full border-4 border-white transition-opacity cursor-pointer ${showContent["2"] ? 'opacity-100' : 'opacity-20'}`} onClick={() => handleDotClick(2)}>
                    <div className={`text2 -ml-5 bg-white bg-opacity-30 p-5 rounded-lg backdrop-blur-md w-72 -translate-x-full transform -translate-y-1/2 transition-opacity duration-5000 ${showContent["2"] ? 'opacity-100' : 'opacity-0'}`}>
                    <h4 className = 'title'>Winglet</h4><br />
           <p> Winglets are essentially aerodynamic performance enhancers. Their primary purpose is to improve aircraft performance by reducing aerodynamic drag. </p>
            </div>
   
    </div>
</Html>

{/* HTML Content for target3 */}
<Html position={target3.toArray()}>
<div className={`dot w-5 h-5 bg-red-500 rounded-full border-4 border-white transition-opacity cursor-pointer ${showContent["3"] ? 'opacity-100' : 'opacity-20'}`} onClick={() => handleDotClick(3)}>
                    <div className={`text3 ml-5 bg-white bg-opacity-30 p-5 rounded-lg backdrop-blur-md w-72 transform -translate-y-1/2 transition-opacity duration-5000 ${showContent["3"] ? 'opacity-100' : 'opacity-0'}`}>
                <h4 className='title'>Vertical Stabilizer</h4> <br />
                <p>A vertical stabilizer is the static part of the vertical tail of an aircraft.</p>
            </div>
     
    </div>
</Html>
        </>
    );
}

export default function Skull() {
    return (
        <div>
            <Canvas style={{ width: '100vw', height: '100vh' }}>
                <SkullContent />
                <MyEnvironment />
                <ambientLight intensity={0.2} />
            </Canvas>
        </div>
    );
}