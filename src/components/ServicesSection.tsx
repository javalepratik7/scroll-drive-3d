import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    title: "Freight Transport",
    description: "Reliable nationwide freight delivery with real-time tracking and professional handling.",
    features: ["24/7 Tracking", "Secure Handling", "On-time Delivery"],
    icon: "🚛"
  },
  {
    title: "Logistics Management",
    description: "End-to-end supply chain solutions optimized for efficiency and cost-effectiveness.",
    features: ["Route Optimization", "Inventory Management", "Cost Analysis"],
    icon: "📦"
  },
  {
    title: "Express Delivery",
    description: "Fast delivery services for urgent shipments with guaranteed time windows.",
    features: ["Same Day Delivery", "Priority Handling", "Emergency Response"],
    icon: "⚡"
  }
];

const ServicesSection = () => {
  const [model, setModel] = useState(null);
  const [mixer, setMixer] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/src/Models/Bird/scene.gltf",
      (gltf) => {
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        gltf.scene.position.set(0, 0, 0);
        setModel(gltf.scene);

        // if you want to perform play animations on it then we use this method
        if (gltf.animations && gltf.animations.length > 0) {
          const newMixer = new THREE.AnimationMixer(gltf.scene);
          const action = newMixer.clipAction(gltf.animations[0]);
          action.play();
          setMixer(newMixer);
        }
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (!mixer) return;
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      mixer.update(clock.getDelta());
    };
    animate();
  }, [mixer]);


  const points = [
  new THREE.Vector3(0, -2, 0),
  new THREE.Vector3(0.8, -1.6, 0),
  new THREE.Vector3(0, -1.4, -0.8),
  new THREE.Vector3(-0.8, -1.6, 0)
];

const MovingModel = ({ model }) => {
  const ref = useRef();
  const [targetIndex, setTargetIndex] = useState(0);

  useFrame(() => {
    if (!ref.current) return;
    // Move towards target
    ref.current.position.lerp(points[targetIndex], 0.02);

    // If close enough to target, move to next
    if (ref.current.position.distanceTo(points[targetIndex]) < 0.05) {
      setTargetIndex((prev) => (prev + 1) % points.length);
    }
  });

  return <primitive ref={ref} object={model} />;
};


  return (
    <>
      {model && (
        <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20"
        //  mt-[100vh]"
         >
          {/* <Canvas
            camera={{
              position: [0, 0, 1],
              fov: 45,
              near: 0.1,
              far: 1000,
            }}
            shadows
            className="w-[100vw] h-[100vh]"
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          > */}
          <Canvas
              camera={{
                position: [0, 0, 1],
                fov: 45,
                near: 0.1,
                far: 1000,
              }}
              shadows
              style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                marginTop:"350vh",
                zIndex: 999, // Keeps it behind UI
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >

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
            <pointLight position={[-5, 5, -5]} intensity={0.8} color="#ff6b35" distance={20} />
            <spotLight
              position={[0, 8, 8]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              castShadow
              color="#4a90e2"
            />
            <Environment preset="warehouse" />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={20} />

            {/* <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
                <primitive object={model} position={[0, -0.2, 0.01]} />
              </Float>
            </Suspense> */}
            <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
              <MovingModel model={model} />
            </Float>
          </Suspense>
          </Canvas>

          <div className="max-w-6xl mx-auto ">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive transportation solutions designed to meet your business needs with precision and reliability.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="transport-card hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <CardTitle className="text-2xl text-primary">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {service.features.map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServicesSection;
