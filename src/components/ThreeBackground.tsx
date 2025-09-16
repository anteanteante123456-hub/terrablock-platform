"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function WireframeBuilding({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 2, 1), []);
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <primitive object={geometry} />
        <meshBasicMaterial color="#6366F1" wireframe wireframeLinewidth={1} />
      </mesh>
    </Float>
  );
}

function BuildingGrid() {
  const buildings = useMemo(() => {
    const items = [];
    for (let x = -5; x <= 5; x += 2) {
      for (let z = -5; z <= 5; z += 2) {
        if (Math.random() > 0.3) {
          items.push({
            position: [x + (Math.random() - 0.5), Math.random() * 2, z + (Math.random() - 0.5)] as [number, number, number],
            scale: 0.5 + Math.random() * 1.5,
          });
        }
      }
    }
    return items;
  }, []);

  return (
    <>
      {buildings.map((building, index) => (
        <WireframeBuilding key={index} position={building.position} scale={building.scale} />
      ))}
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <BuildingGrid />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 3}
        />
        <fog attach="fog" args={["#0F0F23", 5, 25]} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-navy pointer-events-none" />
    </div>
  );
}