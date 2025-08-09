import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { Truck } from './Truck';

interface TruckSceneProps {
  scrollProgress: number;
  isHijacked?: boolean;
  isComplete?: boolean;
}

const TruckScene = ({ scrollProgress, isHijacked = false, isComplete = false }: TruckSceneProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate truck entry
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ 
          position: [8, 4, 8], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        shadows
        className="w-full h-full"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.3} color="#4a90e2" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          color="#ffffff"
        />
        <pointLight 
          position={[-5, 5, -5]} 
          intensity={0.8} 
          color="#ff6b35" 
          distance={20}
        />
        <spotLight
          position={[0, 8, 8]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#4a90e2"
        />

        {/* Environment */}
        <Environment preset="warehouse" />
        
        {/* Ground Shadows */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={20}
        />

        {/* Truck Model */}
        <Suspense fallback={null}>
          <Float 
            speed={1.5} 
            rotationIntensity={0.1} 
            floatIntensity={0.1}
            enabled={!isHijacked && scrollProgress === 0}
          >
            <Truck 
              scrollProgress={scrollProgress} 
              isVisible={isVisible}
              isHijacked={isHijacked}
              isComplete={isComplete}
            />
          </Float>
        </Suspense>

        {/* Camera Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={!isHijacked}
          autoRotate={!isHijacked && scrollProgress === 0}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background/20" />
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 ${
            isHijacked ? 'scale-150 bg-primary/20' : ''
          }`} 
        />
        {isComplete && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 animate-fade-in" />
        )}
      </div>
    </div>
  );
};

export default TruckScene;