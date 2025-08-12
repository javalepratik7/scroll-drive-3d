import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SkyDome component (image covers all sides)
function SkyDome({ imageUrl }) {
  const texture = new THREE.TextureLoader().load(imageUrl);
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

// Animated water
function AnimatedWater({ url, scale, position }) {
  const [scene, setScene] = useState(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.color.set("#1976D2");
          child.material.vertexColors = false;
          child.material.map = null; // Remove texture
          child.material.needsUpdate = true;
        }
      });

      setScene(gltf.scene);

      if (gltf.animations && gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.clipAction(gltf.animations[0]).play();
        mixerRef.current = mixer;
      }
    });
  }, [url]);

  useFrame(() => {
    if (mixerRef.current) {
      mixerRef.current.update(clockRef.current.getDelta());
    }
  });

  if (!scene) return null;

  return <primitive object={scene} scale={scale} position={position} />;
}

// Animated ship
function AnimatedShip({ model }) {
  const shipRef = useRef();

  useFrame(({ clock }) => {
    if (shipRef.current) {
      shipRef.current.position.z = Math.sin(clock.getElapsedTime()) * 2;
      shipRef.current.position.y = Math.sin(clock.getElapsedTime()) * 1;
    }
  });

  if (!model) return null;

  return (
    <primitive
      ref={shipRef}
      object={model}
      position={[-60, 3, -32]}
      scale={[1.5, 1.5, 1.5]}
    />
  );
}

// Animated birds with flapping wings
function FlyingBirds({ model }) {
  const birdsRef = useRef();
  const mixerRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    if (!model) return;

    mixerRef.current = new THREE.AnimationMixer(model.scene);
    if (model.animations && model.animations.length > 0) {
      model.animations.forEach((clip) => {
        mixerRef.current.clipAction(clip).play();
      });
    }
  }, [model]);

  useFrame(({ clock }) => {
    if (birdsRef.current) {
      birdsRef.current.position.z = -clock.getElapsedTime() * 3;
      birdsRef.current.position.y = 53 + Math.sin(clock.getElapsedTime()) * 1;
    }
    if (mixerRef.current) {
      mixerRef.current.update(clockRef.current.getDelta());
    }
  });

  if (!model) return null;

  return (
    <primitive
      ref={birdsRef}
      object={model.scene}
      position={[10, 53, -2]}
      scale={[5, 5, 5]}
    />
  );
}

function ShipSectipn() {
  const [model, setModel] = useState(null);
  const [bird, setBird] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;
    const letters = titleRef.current.querySelectorAll(".letter");
    gsap.from(letters, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      delay: 2,
    });
  }, [isVisible]);

  const text = "SISAM";

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/src/Models/ship/scene.gltf", (gltf) => {
      setModel(gltf.scene);
    });
    loader.load("/src/Models/flyingBirds/scene.gltf", (gltf) => {
      setBird({ scene: gltf.scene, animations: gltf.animations });
    });

    setTimeout(() => setIsVisible(true), 500);
  }, []);

  useEffect(() => {
    if (!model) return;
    gsap.to(model.position, {
      x: 20,
      z: 3,
      duration: 6,
      yoyo: true,
      scrollTrigger: {
        scrub: 2,
        pin: true,
      },
    });
  }, [model]);

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-[100vh]">
      <Canvas
        camera={{ position: [-50, 20, 100], fov: 45, near: 0.1, far: 2000 }}
        shadows
        className="w-full h-[100vh]"
        gl={{ antialias: true, alpha: true }}
      >
        {/* Giant sphere with the image */}
        <SkyDome imageUrl="/src/Images/seaImg.jpg" />

        {/* Lighting */}
        <ambientLight intensity={10} color="#212121" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={10}
          castShadow
          color="#212121"
        />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#212121" />
        <spotLight
          position={[0, 8, 8]}
          angle={0.3}
          penumbra={1}
          intensity={0}
        />

        <Environment preset="warehouse" />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={20}
        />

        <Suspense fallback={null}>
          <group
            rotation={[0, -(135 * Math.PI) / 180, 0]}
            position={[0, -20, 0]}
          >
            <Float
              speed={1.5}
              rotationIntensity={0.1}
              floatIntensity={0.1}
            >
              <AnimatedShip model={model} />
            </Float>

            <Float
              speed={1.5}
              rotationIntensity={0.1}
              floatIntensity={0.1}
              position={[0, 0, 100]}
            >
              <FlyingBirds model={bird} />
            </Float>

            <Float
              speed={1.5}
              rotationIntensity={0.1}
              floatIntensity={0.1}
            >
              <AnimatedWater
                url="/src/Models/water/scene.gltf"
                // url="/src/Models/waves.glb"
                position={[-0.5, 0, 0]}
                scale={[50, 50, 50]}
              />
            </Float>
          </group>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Overlay text */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        <h1
          ref={titleRef}
          style={{ color: "#212121", fontSize: "52px", fontWeight: "bold" }}
          className="title"
        >
          {text.split("").map((letter, i) => (
            <span key={i} className="letter inline-block">
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default ShipSectipn;
