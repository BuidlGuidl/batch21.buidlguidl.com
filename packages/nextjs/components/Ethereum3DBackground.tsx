"use client";

import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingEthLogoProps {
  position: [number, number, number];
  speed: number;
  scale: number;
}

// Create the exact Ethereum shape from the CodePen
const createEthereumGeometry = () => {
  const makePart = (pts: number[][]) => {
    const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p[0], p[1], p[2])));
    const index = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1];
    g.setIndex(index);
    g.computeVertexNormals();
    return g;
  };

  const gPartTop = makePart([
    [0, 1, 1], // pinnacle
    [0, -1, 0],
    [2, 0, 0],
    [0, 4, 0],
    [-2, 0, 0],
  ]);

  const gPartBottom = makePart([
    [0, -1.125, 0.5], // pinnacle
    [0, -3, 0],
    [2, 0, 0],
    [0, -1, 0],
    [-2, 0, 0],
  ]);
  gPartBottom.translate(0, -0.5, 0);

  // Manually merge geometries
  const gFrontMerged = gPartTop.clone();
  const gPartBottomClone = gPartBottom.clone();

  // Combine geometries by merging their positions and indices
  const positions1 = gFrontMerged.attributes.position.array as Float32Array;
  const positions2 = gPartBottomClone.attributes.position.array as Float32Array;
  const indices1 = gFrontMerged.index?.array as Uint16Array | Uint32Array | null;
  const indices2 = gPartBottomClone.index?.array as Uint16Array | Uint32Array | null;

  const mergedPositions = new Float32Array(positions1.length + positions2.length);
  mergedPositions.set(positions1);
  mergedPositions.set(positions2, positions1.length);

  const offset = positions1.length / 3;
  const mergedIndices =
    indices1 && indices2
      ? new Uint32Array([...Array.from(indices1), ...Array.from(indices2).map(i => i + offset)])
      : undefined;

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(mergedPositions, 3));
  if (mergedIndices) {
    g.setIndex(new THREE.BufferAttribute(mergedIndices, 1));
  }
  g.computeVertexNormals();

  // Create back face (mirrored)
  const gBack = g.clone();
  gBack.scale(-1, 1, 1);

  // Merge front and back
  const positions3 = g.attributes.position.array as Float32Array;
  const positionsBack = gBack.attributes.position.array as Float32Array;
  const indicesG = g.index?.array as Uint16Array | Uint32Array | null;
  const indicesBack = gBack.index?.array as Uint16Array | Uint32Array | null;

  const finalPositions = new Float32Array(positions3.length + positionsBack.length);
  finalPositions.set(positions3);
  finalPositions.set(positionsBack, positions3.length);

  const offsetBack = positions3.length / 3;
  const finalIndices =
    indicesG && indicesBack
      ? new Uint32Array([...Array.from(indicesG), ...Array.from(indicesBack).map(i => i + offsetBack)])
      : undefined;

  const finalGeometry = new THREE.BufferGeometry();
  finalGeometry.setAttribute("position", new THREE.BufferAttribute(finalPositions, 3));
  if (finalIndices) {
    finalGeometry.setIndex(new THREE.BufferAttribute(finalIndices, 1));
  }
  finalGeometry.computeVertexNormals();

  return finalGeometry;
};

// 3D Ethereum logo with proper geometry
const FloatingEthLogo = ({ position, speed, scale }: FloatingEthLogoProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef(Date.now());

  // Color distribution from light blue to dark blue
  const blueShades = [
    "#87CEEB", // Sky blue (light)
    "#5DB4E8", // Light blue
    "#4A9FD8", // Medium light blue
    "#3A8FD0", // Medium blue
    "#2A7EC8", // Medium dark blue
    "#1A6EBF", // Dark blue
    "#0A5EB7", // Very dark blue
  ];

  const color = blueShades[Math.floor(Math.random() * blueShades.length)];
  const emissive = blueShades[Math.floor(Math.random() * blueShades.length)];

  useFrame(() => {
    if (meshRef.current) {
      const elapsed = (Date.now() - startTime.current) * 0.001;
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.008;
      meshRef.current.rotation.z += speed * 0.005;
      meshRef.current.position.y = position[1] + Math.sin(elapsed * speed) * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale * 0.35, scale * 0.35, scale * 0.35]}
      geometry={createEthereumGeometry()}
      castShadow
      receiveShadow
    >
      <meshPhongMaterial color={color} emissive={emissive} emissiveIntensity={0.2} shininess={100} />
    </mesh>
  );
};

const Scene3D = () => {
  const logos = [];

  // Create 3D grid pattern with improved distribution
  for (let x = -5; x <= 5; x += 3.3) {
    for (let y = -5; y <= 5; y += 3.3) {
      for (let z = -3; z <= 0; z += 1.5) {
        logos.push({
          id: `${x}-${y}-${z}`,
          position: [x, y, z] as [number, number, number],
          speed: Math.random() * 0.5 + 0.2,
          scale: Math.random() * 0.5 + 0.3,
        });
      }
    }
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={75} />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" castShadow />
      <pointLight position={[-10, -10, 5]} intensity={0.6} color="#627EEA" />

      <color attach="background" args={["#0f172a"]} />

      {logos.map(logo => (
        <FloatingEthLogo key={logo.id} position={logo.position} speed={logo.speed} scale={logo.scale} />
      ))}
    </>
  );
};

export const Ethereum3DBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-screen pointer-events-none">
      <Canvas>
        <Scene3D />
      </Canvas>
    </div>
  );
};
