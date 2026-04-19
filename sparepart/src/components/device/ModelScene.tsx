"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} dispose={null} />;
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#C8DDEF" wireframe />
    </mesh>
  );
}

export default function ModelScene({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 2.5], fov: 45 }}
      shadows
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 3]} intensity={1.2} castShadow />
      <Suspense fallback={<Loader />}>
        <Model url={modelUrl} />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.25}
          blur={2}
        />
      </Suspense>
      <OrbitControls
        enableZoom
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}
