import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { Group, Mesh } from 'three';

interface TruckProps {
  scrollProgress: number;
  isVisible: boolean;
  isHijacked?: boolean;
  isComplete?: boolean;
}

export const Truck = ({ scrollProgress, isVisible, isHijacked = false, isComplete = false }: TruckProps) => {
  const groupRef = useRef<Group>(null);
  const frontWheelLeftRef = useRef<Mesh>(null);
  const frontWheelRightRef = useRef<Mesh>(null);
  const rearWheelLeftRef = useRef<Mesh>(null);
  const rearWheelRightRef = useRef<Mesh>(null);

  // Calculate rotation based on scroll
  const rotation = useMemo(() => {
    return scrollProgress * Math.PI * 2; // Full rotation
  }, [scrollProgress]);

  useFrame((state) => {
    if (groupRef.current) {
      // Apply scroll-based rotation with smooth interpolation
      if (isHijacked) {
        groupRef.current.rotation.y = rotation;
        // Reset position during hijack
        groupRef.current.position.y = 0;
      } else if (scrollProgress === 0) {
        // Add subtle floating animation when not scrolling
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      }

      // Animate visibility and completion effect
      const targetScale = isVisible ? 1 : 0;
      const currentScale = groupRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.1;
      groupRef.current.scale.setScalar(newScale);

      // Completion glow effect
      if (isComplete) {
        const glowIntensity = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
        groupRef.current.scale.setScalar(glowIntensity);
      }
    }

    // Animate wheels - faster when hijacked
    const wheelSpeed = isHijacked ? 4 : 2;
    const wheelRotation = state.clock.elapsedTime * wheelSpeed;
    if (frontWheelLeftRef.current) frontWheelLeftRef.current.rotation.x = wheelRotation;
    if (frontWheelRightRef.current) frontWheelRightRef.current.rotation.x = wheelRotation;
    if (rearWheelLeftRef.current) rearWheelLeftRef.current.rotation.x = wheelRotation;
    if (rearWheelRightRef.current) rearWheelRightRef.current.rotation.x = wheelRotation;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Truck Cab */}
      <Box 
        args={[2, 1.5, 1.2]} 
        position={[1.5, 0.5, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#2563eb" 
          metalness={0.3}
          roughness={0.4}
        />
      </Box>

      {/* Truck Hood */}
      <Box 
        args={[1, 0.8, 1]} 
        position={[0.2, 0.2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#1d4ed8" 
          metalness={0.4}
          roughness={0.3}
        />
      </Box>

      {/* Container */}
      <Box 
        args={[4, 2, 1.2]} 
        position={[-1.5, 0.8, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#ea580c" 
          metalness={0.2}
          roughness={0.6}
        />
      </Box>

      {/* Container Details */}
      <Box 
        args={[0.1, 1.8, 1.1]} 
        position={[-3.4, 0.8, 0]}
        castShadow
      >
        <meshStandardMaterial 
          color="#dc2626" 
          metalness={0.7}
          roughness={0.2}
        />
      </Box>

      {/* Front Bumper */}
      <Box 
        args={[0.3, 0.3, 1.2]} 
        position={[-0.5, -0.1, 0]}
        castShadow
      >
        <meshStandardMaterial 
          color="#374151" 
          metalness={0.8}
          roughness={0.1}
        />
      </Box>

      {/* Wheels */}
      <Cylinder 
        ref={frontWheelLeftRef}
        args={[0.4, 0.4, 0.3]} 
        position={[0.5, -0.5, 0.7]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.1}
          roughness={0.9}
        />
      </Cylinder>

      <Cylinder 
        ref={frontWheelRightRef}
        args={[0.4, 0.4, 0.3]} 
        position={[0.5, -0.5, -0.7]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.1}
          roughness={0.9}
        />
      </Cylinder>

      <Cylinder 
        ref={rearWheelLeftRef}
        args={[0.4, 0.4, 0.3]} 
        position={[-2.5, -0.5, 0.7]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.1}
          roughness={0.9}
        />
      </Cylinder>

      <Cylinder 
        ref={rearWheelRightRef}
        args={[0.4, 0.4, 0.3]} 
        position={[-2.5, -0.5, -0.7]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.1}
          roughness={0.9}
        />
      </Cylinder>

      {/* Headlights */}
      <Sphere 
        args={[0.15]} 
        position={[-0.35, 0.1, 0.4]}
        castShadow
      >
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#fbbf24"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>

      <Sphere 
        args={[0.15]} 
        position={[-0.35, 0.1, -0.4]}
        castShadow
      >
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#fbbf24"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>

      {/* Window */}
      <Box 
        args={[1.8, 1.2, 0.02]} 
        position={[2.45, 0.6, 0]}
        castShadow
      >
        <meshStandardMaterial 
          color="#60a5fa" 
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </Box>
    </group>
  );
};