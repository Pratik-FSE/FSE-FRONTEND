import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Torus, Box, Octahedron, Dodecahedron, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}

// Animated floating icosahedron with distortion
export const FloatingIcosahedron = ({ position, color, speed = 1, distort = 0.4, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1 * scale, 1]} position={position}>
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
export const GlowingTorus = ({ position, color, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[1 * scale, 0.3 * scale, 16, 32]} position={position}>
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
export const MorphingOctahedron = ({ position, color, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * Math.PI;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * Math.PI;
      const scaleVal = scale + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      meshRef.current.scale.set(scaleVal, scaleVal, scaleVal);
    }
  });

  return (
    <Float speed={1} rotationIntensity={2} floatIntensity={1}>
      <Octahedron ref={meshRef} args={[0.8 * scale]} position={position}>
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
export const GlowingCube = ({ position, color, scale = 1 }: FloatingShapeProps) => {
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
        <Box ref={meshRef} args={[1 * scale, 1 * scale, 1 * scale]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </Box>
        <Box ref={wireRef} args={[1.1 * scale, 1.1 * scale, 1.1 * scale]}>
          <meshBasicMaterial color={color} wireframe />
        </Box>
      </group>
    </Float>
  );
};

// Glowing ring
export const GlowingRing = ({ position, color, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <Ring ref={meshRef} args={[0.8 * scale, 1 * scale, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          side={THREE.DoubleSide}
        />
      </Ring>
    </Float>
  );
};

// DNA-like helix
export const DNAHelix = ({ position, color }: FloatingShapeProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const spheres = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 4;
      const y = (i - 10) * 0.3;
      items.push({
        pos1: [Math.cos(angle) * 0.5, y, Math.sin(angle) * 0.5] as [number, number, number],
        pos2: [Math.cos(angle + Math.PI) * 0.5, y, Math.sin(angle + Math.PI) * 0.5] as [number, number, number],
      });
    }
    return items;
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {spheres.map((s, i) => (
          <group key={i}>
            <Sphere args={[0.08]} position={s.pos1}>
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </Sphere>
            <Sphere args={[0.08]} position={s.pos2}>
              <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
            </Sphere>
          </group>
        ))}
      </group>
    </Float>
  );
};

// Dodecahedron with glow
export const GlowingDodecahedron = ({ position, color, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Dodecahedron ref={meshRef} args={[0.8 * scale]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </Dodecahedron>
    </Float>
  );
};

// Particle field background
export const ParticleField = ({ count = 500, color = "#8b5cf6" }) => {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

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
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// Animated lines connecting points
export const ConnectedLines = ({ color = "#8b5cf6" }) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions } = useMemo(() => {
    const pos = new Float32Array(60 * 3);
    for (let i = 0; i < 20; i++) {
      // Start point
      pos[i * 6] = (Math.random() - 0.5) * 10;
      pos[i * 6 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 6 + 2] = (Math.random() - 0.5) * 10;
      // End point
      pos[i * 6 + 3] = (Math.random() - 0.5) * 10;
      pos[i * 6 + 4] = (Math.random() - 0.5) * 10;
      pos[i * 6 + 5] = (Math.random() - 0.5) * 10;
    }
    return { positions: pos };
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={40} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </lineSegments>
  );
};
