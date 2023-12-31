import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Material, Vector3, Object3D } from 'three';
import { gsap } from 'gsap';
import MyEnvironment from './Environment';


function SkullContent() {
    const gltf = useGLTF('./skull4.gltf');
    const scene = gltf.scene;
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);

    const [activeTarget, setActiveTarget] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showContent, setShowContent] = useState<{ [key: string]: boolean }>({ '1': false, '2': false, '3': false });

    const initialTarget = useMemo(() => new Vector3(), []);
    const target1 = useMemo(() => new Vector3(0, 1.2, 1.6), []);
    const target2 = useMemo(() => new Vector3(0, 0.2, -1.7), []);
    const target3 = useMemo(() => new Vector3(0, -1, 1.8), []);

    const cameraPositions = useMemo(() => [
        new Vector3(-2, 1.2, 3.5),
        new Vector3(2, 0.2, -4),
        new Vector3(2, -1, 3.5)
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

            setTimeout(() => setShowContent(prevState => ({ ...prevState, [indexKey]: false })), 10000);
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

            <primitive object={scene} scale={0.0075} />
            
            {/* HTML Content for target1 */}
            <Html position={target1.toArray()}>
                <div className={`dot w-5 h-5 bg-red-500 rounded-full border-4 border-white transition-opacity cursor-pointer ${showContent["1"] ? 'opacity-100' : 'opacity-30'}`} onClick={() => handleDotClick(1)}>
                    <div className={`text1 ml-5 bg-white bg-opacity-30 p-5 rounded-lg backdrop-blur-md w-72 transform -translate-y-1/2 transition-opacity duration-5000 ${showContent["1"] ? 'opacity-100' : 'opacity-0'}`}>
                        <h4 className='title'>Frontal Bone</h4>
                        <p>The frontal bone is a shell-shaped, unpaired, flat bone of the skull located in the forehead region.</p>
                    </div>
                </div>
            </Html>

            <Html position={target2.toArray()}>
            <div className={`dot w-5 h-5 bg-red-500 rounded-full border-4 border-white transition-opacity cursor-pointer ${showContent["2"] ? 'opacity-100' : 'opacity-30'}`} onClick={() => handleDotClick(2)}>
                    <div className={`text2 ml-5 bg-white bg-opacity-30 p-5 rounded-lg backdrop-blur-md w-72 transform -translate-y-1/2 transition-opacity duration-5000 ${showContent["2"] ? 'opacity-100' : 'opacity-0'}`}>
                <h4 className='title'>Occipital Bone</h4>
                <p>The occipital bone is an unpaired bone which covers the back of the head (occiput). It makes up a large portion of the basilar part of the neurocranium and entirely houses the cerebellum.</p>
            </div>
   
    </div>
</Html>

{/* HTML Content for target3 */}
<Html position={target3.toArray()}>
<div className={`dot w-5 h-5 bg-red-500 rounded-full border-4 border-white transition-opacity cursor-pointer ${showContent["3"] ? 'opacity-100' : 'opacity-30'}`} onClick={() => handleDotClick(3)}>
                    <div className={`text3 ml-5 bg-white bg-opacity-30 p-5 rounded-lg backdrop-blur-md w-72 transform -translate-y-1/2 transition-opacity duration-5000 ${showContent["3"] ? 'opacity-100' : 'opacity-0'}`}>
                <h4 className='title'>Mandible</h4>
                <p>The mandible is the largest bone of the facial skeleton, crucial for jaw movement and forming the lower jawline.</p>
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