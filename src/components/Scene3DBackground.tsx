import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Floating 3D shapes for section backgrounds
interface AnimatedShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

const AnimatedSphere = ({ position, color, scale = 1 }: AnimatedShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
};

const AnimatedTorus = ({ position, color, scale = 1 }: AnimatedShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Torus ref={meshRef} args={[1, 0.4, 16, 48]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </Torus>
    </Float>
  );
};

const AnimatedCube = ({ position, color, scale = 1 }: AnimatedShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && wireRef.current) {
      const rot = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = rot;
      meshRef.current.rotation.y = rot * 1.2;
      wireRef.current.rotation.x = rot;
      wireRef.current.rotation.y = rot * 1.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={1}>
      <group position={position} scale={scale}>
        <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.2}
            roughness={0.1}
            metalness={0.9}
          />
        </Box>
        <Box ref={wireRef} args={[1.6, 1.6, 1.6]}>
          <meshBasicMaterial color={color} wireframe opacity={0.5} transparent />
        </Box>
      </group>
    </Float>
  );
};

const AnimatedDodecahedron = ({ position, color, scale = 1 }: AnimatedShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * Math.PI;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * Math.PI;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
      <Dodecahedron ref={meshRef} args={[1]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0.2}
          speed={3}
          roughness={0.3}
          metalness={0.7}
        />
      </Dodecahedron>
    </Float>
  );
};

// 3D Background for sections
interface Scene3DBackgroundProps {
  variant?: 'spheres' | 'geometric' | 'mixed';
}

export const Scene3DBackground = ({ variant = 'mixed' }: Scene3DBackgroundProps) => {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#06b6d4" />

        {variant === 'spheres' && (
          <>
            <AnimatedSphere position={[-4, 2, -5]} color="#8b5cf6" scale={0.8} />
            <AnimatedSphere position={[4, -1, -3]} color="#06b6d4" scale={0.6} />
            <AnimatedSphere position={[0, 3, -4]} color="#ec4899" scale={0.5} />
          </>
        )}

        {variant === 'geometric' && (
          <>
            <AnimatedTorus position={[-3, 1, -4]} color="#8b5cf6" scale={0.6} />
            <AnimatedCube position={[3, -1, -3]} color="#06b6d4" scale={0.5} />
            <AnimatedDodecahedron position={[1, 2, -5]} color="#ec4899" scale={0.5} />
          </>
        )}

        {variant === 'mixed' && (
          <>
            <AnimatedSphere position={[-4, 2, -5]} color="#8b5cf6" scale={0.6} />
            <AnimatedTorus position={[4, 0, -4]} color="#06b6d4" scale={0.5} />
            <AnimatedCube position={[-2, -2, -3]} color="#ec4899" scale={0.4} />
            <AnimatedDodecahedron position={[2, 3, -6]} color="#8b5cf6" scale={0.4} />
          </>
        )}
      </Canvas>
    </div>
  );
};

// Parallax 3D element that responds to scroll
interface Parallax3DProps {
  children: React.ReactNode;
  offset?: number;
}

export const Parallax3D = ({ children, offset = 50 }: Parallax3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <motion.div ref={ref} style={{ y, rotateZ: rotate }}>
      {children}
    </motion.div>
  );
};

// Scroll-triggered 3D reveal
interface ScrollReveal3DProps {
  children: React.ReactNode;
  delay?: number;
}

export const ScrollReveal3D = ({ children, delay = 0 }: ScrollReveal3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateX: 45, y: 50 }}
      animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default Scene3DBackground;
