import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { Truck } from './Truck';
// import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group } from 'three';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { CustomEase } from "gsap/CustomEase";


interface TruckSceneProps {
  data: unknown; // replace with the actual type of data
}

// CustomEase.create("custom", "M0,0 C0.126,0.382 0.324,0.036 0.543,0.036 0.911,0.035 0.818,1.001 1,1");


gsap.registerPlugin(ScrollTrigger);


const TruckScene : React.FC<TruckSceneProps>  = ({data}) => {
  const [model, setModel] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mixer, setMixer] = useState(null);
  
  useEffect(()=>{
    console.log("data", data)

    

    if(data==true){
      // gsap.to()
        gsap.to(model.position, {
          x: -0.1,
          z: 3,
          duration: 6,
          // delay: 1,
          yoyo: true,
          scrub: 2,
          // repeat: 1, // repeats once (forward + backward)
          // ease: "power1.inOut"
          // ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.324,0.036 0.543,0.036 0.911,0.035 0.818,1.001 1,1 ")
ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.019,1.419 0.174,1.445 0.438,1.706 0.44,1.739 0.646,1.659 0.846,1.647 0.811,1.347 0.852,1.232 0.867,1.19 0.906,1.022 0.959,1.085 0.968,1.097 0.991,0.96 1,1 "),          // ease: "bounce.out"
          // ease: "elastic.out(1,0.3)"
          // ease: "slow(0.7,0.7,false)",
        });

     gsap.to(model.rotation, {
  y: -(360 * Math.PI / 180),
  z: 0,
  markers: true,
  start:"bottom 20%",
  end:"top -10%",
  duration:6,
  ease: "power1.out",
  // delay:1,
    scrub: 2
});
      animate()

    }
  },[data])
  

  // Animate truck entry after small delay
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
    CustomEase.create("custom", "M0,0 C0.017,0.053 0.069,0.169 0.103,0.169 0.153,0.169 0.19,0.031 0.226,0.033 0.336,0.035 0.4,0.036 0.543,0.036 0.674,0.035 0.798,-0.015 0.868,0.127 0.906,0.203 0.913,0.443 0.93,0.536 0.967,0.751 0.918,1 1,1 ")
  }, []);

  // Load model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/src/Models/Car/scene.gltf",
      (gltf) => {
        setModel(gltf.scene);

        // if you want to perform play animations on it then we use this method
                if (gltf.animations && gltf.animations.length > 0) {
                  const newMixer = new THREE.AnimationMixer(gltf.scene);
                   const action1 = newMixer.clipAction(gltf.animations[0]);
                      action1.play();

                      // Play second animation

                      // if (gltf.animations[2]) {
                      //   const action2 = newMixer.clipAction(gltf.animations[2]);
                      //   action2.play();
                      // }
                  setMixer(newMixer);
                }
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  }, []);

  // Animate on scroll once model is loaded
  useEffect(() => {
    if (!model) return; // Wait until model exists
    

    gsap.to(model.position, {
        x: -0.1,
        z: 5.5,
        // y:0.00005,
        markers: true,
        start:"top 0%",
        end:"top -10%",
      scrollTrigger: {
        scrub: 2,
        pin: true
      }
    });
     gsap.to(model.rotation, {
  y: -(90 * Math.PI / 180),
  z: 0,
  markers: true,
  start:"bottom 20%",
  end:"top -10%",
  scrollTrigger: {
    scrub: 2
  }
});
  }, [model]); // dependency so it runs after model is loaded

    useEffect(() => {
      if (!mixer) return;
      
    }, [mixer]);
    
  const clock = new THREE.Clock();
 const animate = () => {
        requestAnimationFrame(animate);
        mixer.update(clock.getDelta());
      };

  if (!isVisible) return null; // optional: hide until visible

  

  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
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
          >
             <primitive
      object={model}
      position={[0, -0.8, 0]}
      rotation={[0, 0 * Math.PI * 2, 0]}
    />
            {/* <Truck 
              scrollProgress={scrollProgress} 
              isVisible={isVisible}
              isHijacked={isHijacked}
              isComplete={isComplete}
            /> */}
          </Float>
        </Suspense>

        {/* Camera Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          // enableRotate={!isHijacked}
          // autoRotate={!isHijacked && scrollProgress === 0}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default TruckScene;