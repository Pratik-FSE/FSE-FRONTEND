import { Canvas } from '@react-three/fiber';
import { FloatingIcosahedron, GlowingTorus, MorphingOctahedron, GlowingDodecahedron, ParticleField, DNAHelix, GlowingRing, ConnectedLines } from './FloatingShapes';

const AboutScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      className="absolute inset-0"
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#ec4899" />

      {/* Central DNA helix */}
      <DNAHelix position={[0, 0, 0]} color="#8b5cf6" />
      
      {/* Floating shapes around */}
      <GlowingRing position={[4, 2, -3]} color="#06b6d4" scale={1.5} />
      <GlowingDodecahedron position={[-4, -1, -2]} color="#ec4899" scale={0.8} />
      <FloatingIcosahedron position={[3, -2, -1]} color="#8b5cf6" speed={0.8} scale={0.6} />
      <GlowingTorus position={[-3, 2, -2]} color="#06b6d4" scale={0.7} />
      <MorphingOctahedron position={[0, 3, -4]} color="#ec4899" scale={0.5} />

      {/* Background elements */}
      <ParticleField count={300} color="#8b5cf6" />
      <ConnectedLines color="#06b6d4" />
    </Canvas>
  );
};

export default AboutScene;
