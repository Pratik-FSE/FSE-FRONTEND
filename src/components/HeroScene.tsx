import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Torus, Box, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}

// Animated floating icosahedron with distortion
const FloatingIcosahedron = ({ position, color, speed = 1, distort = 0.4 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 1]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Icosahedron>
    </Float>
  );
};

// Rotating torus with glow effect
const GlowingTorus = ({ position, color }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[1, 0.3, 16, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Torus>
    </Float>
  );
};

// Morphing octahedron
const MorphingOctahedron = ({ position, color }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * Math.PI;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * Math.PI;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={1} rotationIntensity={2} floatIntensity={1}>
      <Octahedron ref={meshRef} args={[0.8]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={3}
          roughness={0.3}
          metalness={0.7}
        />
      </Octahedron>
    </Float>
  );
};

// Glowing cube with wireframe
const GlowingCube = ({ position, color }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && wireRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      wireRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      wireRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group position={position}>
        <Box ref={meshRef} args={[1, 1, 1]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </Box>
        <Box ref={wireRef} args={[1.1, 1.1, 1.1]}>
          <meshBasicMaterial color={color} wireframe />
        </Box>
      </group>
    </Float>
  );
};

// Particle field background
const ParticleField = () => {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#8b5cf6" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// Main 3D Scene component
const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      className="absolute inset-0"
      dpr={[1, 2]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#ec4899" />

      {/* Main shapes */}
      <FloatingIcosahedron position={[0, 0, 0]} color="#8b5cf6" speed={1.2} distort={0.5} />
      <GlowingTorus position={[3, 1, -2]} color="#06b6d4" />
      <MorphingOctahedron position={[-3, -1, -1]} color="#ec4899" />
      <GlowingCube position={[2, -2, 1]} color="#8b5cf6" />
      <FloatingIcosahedron position={[-2.5, 2, -3]} color="#06b6d4" speed={0.8} distort={0.3} />

      {/* Particle background */}
      <ParticleField />
    </Canvas>
  );
};

export default HeroScene;
