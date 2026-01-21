import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingIcosahedron, GlowingTorus, GlowingCube, ParticleField, GlowingRing } from './FloatingShapes';

interface ServiceIconProps {
  type: 'gaming' | 'ai' | 'ar' | 'display' | 'video' | 'tech';
  position?: [number, number, number];
}

// Gaming controller-inspired shape
const GamingShape = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Controller body */}
        <mesh>
          <capsuleGeometry args={[0.3, 1, 8, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Buttons */}
        <mesh position={[0.2, 0.2, 0.3]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.2, 0.2, 0.3]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, -0.1, 0.3]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

// AI brain-like shape
const AIShape = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.8, 2]} />
        <MeshDistortMaterial
          color="#ec4899"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// AR glasses shape
const ARShape = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Frame */}
        <mesh>
          <torusGeometry args={[0.3, 0.05, 8, 32]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.5, 0, 0]}>
          <torusGeometry args={[0.3, 0.05, 8, 32]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Bridge */}
        <mesh position={[0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2]} />
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

// Anamorphic display shape
const DisplayShape = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.6, 0.9, 0.05]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
          emissive="#8b5cf6"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

export const ServiceIcon = ({ type, position = [0, 0, 0] }: ServiceIconProps) => {
  switch (type) {
    case 'gaming':
      return <GamingShape position={position} />;
    case 'ai':
      return <AIShape position={position} />;
    case 'ar':
      return <ARShape position={position} />;
    case 'display':
      return <DisplayShape position={position} />;
    default:
      return <FloatingIcosahedron position={position} color="#8b5cf6" />;
  }
};

interface ServiceSceneProps {
  activeService?: string;
}

const ServiceScene = ({ activeService }: ServiceSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      className="absolute inset-0"
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#ec4899" />
      <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#8b5cf6" />

      {/* Main floating shapes */}
      <GlowingRing position={[0, 0, 0]} color="#8b5cf6" scale={2} />
      <GlowingTorus position={[3, 2, -3]} color="#06b6d4" scale={0.8} />
      <GlowingCube position={[-3, -1, -2]} color="#ec4899" scale={0.7} />
      <FloatingIcosahedron position={[2, -2, -1]} color="#8b5cf6" speed={0.8} scale={0.5} />

      {/* Background */}
      <ParticleField count={400} color="#8b5cf6" />
    </Canvas>
  );
};

export default ServiceScene;
