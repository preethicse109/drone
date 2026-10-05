import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Environment, OrbitControls, Stars } from '@react-three/drei';
import { useSimulationStore } from '../../store/simulationStore';
import * as THREE from 'three';

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#4a7c59" roughness={0.9} />
      </mesh>
      {/* Grid lines on ground */}
      {Array.from({ length: 21 }, (_, i) => i - 10).map(n => (
        <group key={n}>
          <mesh position={[n * 5, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.05, 100]} />
            <meshBasicMaterial color="#5a8c69" transparent opacity={0.5} />
          </mesh>
          <mesh position={[0, 0.01, n * 5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 0.05]} />
            <meshBasicMaterial color="#5a8c69" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
      {/* Trees */}
      {[[-20, 0, -30], [30, 0, -20], [-35, 0, 15], [25, 0, 40], [-15, 0, 35]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 2, 0]} castShadow>
            <coneGeometry args={[2, 6, 8]} />
            <meshStandardMaterial color="#2d6a4f" />
          </mesh>
          <mesh position={[0, -1, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
            <meshStandardMaterial color="#795548" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function DroneModel({ position, pitch, roll, yaw }) {
  const groupRef = useRef();
  const propRefs = [useRef(), useRef(), useRef(), useRef()];
  const { isFlying } = useSimulationStore();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth position interpolation
      groupRef.current.position.lerp(
        new THREE.Vector3(...position),
        0.05
      );
      // Apply attitude
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, (pitch * Math.PI) / 180, 0.1
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z, (roll * Math.PI) / 180, 0.1
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, (yaw * Math.PI) / 180, 0.05
      );
      
      // Hover wobble
      if (isFlying) {
        const t = state.clock.elapsedTime;
        groupRef.current.position.y += Math.sin(t * 2) * 0.01;
      }
    }
    
    // Spin props
    propRefs.forEach((ref, i) => {
      if (ref.current && isFlying) {
        ref.current.rotation.y += delta * (i % 2 === 0 ? 25 : -25);
      }
    });
  });

  const armPositions = [[1.2, 0, 1.2], [-1.2, 0, 1.2], [1.2, 0, -1.2], [-1.2, 0, -1.2]];

  return (
    <group ref={groupRef} position={position}>
      {/* Frame center */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.15, 0.7]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Arms */}
      {armPositions.map(([x, y, z], i) => (
        <group key={i}>
          <mesh position={[x * 0.5, y, z * 0.5]} rotation={[0, Math.atan2(x, z), 0]} castShadow>
            <boxGeometry args={[1.4, 0.06, 0.08]} />
            <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Motor */}
          <mesh position={[x, 0.1, z]} castShadow>
            <cylinderGeometry args={[0.12, 0.14, 0.2, 16]} />
            <meshStandardMaterial color="#1d4ed8" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Propeller */}
          <group ref={propRefs[i]} position={[x, 0.24, z]}>
            {[0, Math.PI].map((rot, j) => (
              <mesh key={j} rotation={[0, rot, 0]} castShadow>
                <boxGeometry args={[0.7, 0.02, 0.07]} />
                <meshStandardMaterial color="#64748b" transparent opacity={isFlying ? 0.5 : 0.9} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* FC board */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.3, 0.04, 0.3]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* LED lights */}
      {isFlying && (
        <>
          <pointLight position={[0, 0, 0.4]} color="#ff0000" intensity={2} distance={3} />
          <pointLight position={[0, 0, -0.4]} color="#00ff00" intensity={2} distance={3} />
        </>
      )}

      {/* Shadow */}
      <mesh position={[0, -position[1] - 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={Math.max(0, 0.3 - position[1] * 0.01)} />
      </mesh>
    </group>
  );
}

export default function SimulationCanvas() {
  const { dronePosition, pitch, roll, yaw, isFlying, tick } = useSimulationStore();

  // Simulation tick
  useEffect(() => {
    const interval = setInterval(tick, 100);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <div className="absolute inset-0" id="simulation-canvas">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 60 }}
        shadows
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Sky
          sunPosition={[100, 20, 100]}
          turbidity={8}
          rayleigh={0.5}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
        <Stars radius={300} depth={50} count={2000} factor={4} fade />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[50, 100, 50]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={200}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <hemisphereLight skyColor="#87CEEB" groundColor="#4a7c59" intensity={0.4} />

        <Ground />
        
        <DroneModel
          position={dronePosition}
          pitch={pitch}
          roll={roll}
          yaw={yaw}
        />

        <OrbitControls
          makeDefault
          target={dronePosition}
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
}
