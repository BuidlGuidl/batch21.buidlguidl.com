"use client";

import { useMemo, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

// TypeScript interfaces for better type safety
interface FloatingEthLogoProps {
  position: [number, number, number];
  speed: number;
  scale: number;
  isDarkMode: boolean;
}

interface LogoConfig {
  id: string;
  position: [number, number, number];
  speed: number;
  scale: number;
}

// Color schemes for both themes
const COLOR_SCHEMES = {
  dark: {
    logos: [
      "#87CEEB", // Sky blue (light)
      "#5DB4E8", // Light blue
      "#4A9FD8", // Medium light blue
      "#3A8FD0", // Medium blue
      "#2A7EC8", // Medium dark blue
      "#1A6EBF", // Dark blue
      "#0A5EB7", // Very dark blue
    ],
    background: "#0f172a", // Dark slate
    ambientIntensity: 0.4,
    pointLightBlue: "#627EEA",
  },
  light: {
    logos: [
      "#1E3A8A", // Dark blue
      "#2563EB", // Blue-600
      "#3B82F6", // Blue-500
      "#60A5FA", // Blue-400
      "#93C5FD", // Blue-300
      "#DBEAFE", // Blue-100
      "#EFF6FF", // Blue-50
    ],
    background: "#c7ddff", // Light airy blue with a touch more saturation
    ambientIntensity: 0.8,
    pointLightBlue: "#1D4ED8",
  },
};

// Create the exact Ethereum shape from the CodePen (memoized for performance)
const createEthereumGeometry = (): THREE.BufferGeometry => {
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

// Memoized geometry instance (created once)
let ethereumGeometry: THREE.BufferGeometry | null = null;
const getEthereumGeometry = (): THREE.BufferGeometry => {
  if (!ethereumGeometry) {
    ethereumGeometry = createEthereumGeometry();
  }
  return ethereumGeometry;
};

// 3D Ethereum logo with proper geometry
const FloatingEthLogo = ({ position, speed, scale, isDarkMode }: FloatingEthLogoProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef(Date.now());

  // Get color scheme based on theme
  const colorScheme = isDarkMode ? COLOR_SCHEMES.dark : COLOR_SCHEMES.light;

  // Memoize colors to prevent regeneration on each render
  const colors = useMemo(() => {
    const logoColors = colorScheme.logos;
    return {
      color: logoColors[Math.floor(Math.random() * logoColors.length)],
      emissive: logoColors[Math.floor(Math.random() * logoColors.length)],
    };
  }, [colorScheme.logos]);

  useFrame(() => {
    if (meshRef.current) {
      const elapsed = (Date.now() - startTime.current) * 0.001;
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.008;
      meshRef.current.rotation.z += speed * 0.005;
      meshRef.current.position.y = position[1] + Math.sin(elapsed * speed) * 0.5;
    }
  });

  const geometry = useMemo(() => getEthereumGeometry(), []);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale * 0.35, scale * 0.35, scale * 0.35]}
      geometry={geometry}
      castShadow
      receiveShadow
    >
      <meshPhongMaterial
        color={colors.color}
        emissive={colors.emissive}
        emissiveIntensity={isDarkMode ? 0.2 : 0.1}
        shininess={100}
      />
    </mesh>
  );
};

const Scene3D = ({ isDarkMode }: { isDarkMode: boolean }) => {
  // Memoize logo configuration to prevent recreation
  const logos = useMemo<LogoConfig[]>(() => {
    const logoList: LogoConfig[] = [];

    // Create 3D grid pattern with improved distribution
    for (let x = -5; x <= 5; x += 3.3) {
      for (let y = -5; y <= 5; y += 3.3) {
        for (let z = -3; z <= 0; z += 1.5) {
          logoList.push({
            id: `${x}-${y}-${z}`,
            position: [x, y, z] as [number, number, number],
            speed: Math.random() * 0.5 + 0.2,
            scale: Math.random() * 0.5 + 0.3,
          });
        }
      }
    }
    return logoList;
  }, []);

  const colorScheme = isDarkMode ? COLOR_SCHEMES.dark : COLOR_SCHEMES.light;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={75} />

      <ambientLight intensity={colorScheme.ambientIntensity} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={isDarkMode ? 1 : 1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 0.8 : 0.6} color="#ffffff" castShadow />
      <pointLight position={[-10, -10, 5]} intensity={isDarkMode ? 0.6 : 0.4} color={colorScheme.pointLightBlue} />

      <color attach="background" args={[colorScheme.background]} />

      {logos.map(logo => (
        <FloatingEthLogo
          key={logo.id}
          position={logo.position}
          speed={logo.speed}
          scale={logo.scale}
          isDarkMode={isDarkMode}
        />
      ))}
    </>
  );
};

export const Ethereum3DBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 -z-10 w-full h-screen pointer-events-none">
      <Canvas>
        <Scene3D isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
};
