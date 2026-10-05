import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { getComponentById } from '../../data/components';
import * as THREE from 'three';

// Material generator helpers to avoid hook issues
const getEmissive = (selected) => (selected ? '#3b82f6' : '#000000');
const getEmissiveIntensity = (selected, base = 0.25) => (selected ? base : 0);

function FrameGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected);
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.11, 0.65]} />
        <meshStandardMaterial color={color || '#1e293b'} roughness={0.3} metalness={0.7} emissive={em} emissiveIntensity={ei} />
      </mesh>
      {[
        [0.55, 0, 0.55, Math.PI / 4],
        [-0.55, 0, 0.55, -Math.PI / 4],
        [0.55, 0, -0.55, -Math.PI / 4],
        [-0.55, 0, -0.55, Math.PI / 4],
      ].map(([x, y, z, rot], i) => (
        <mesh key={i} castShadow position={[x * 0.5, y, z * 0.5]} rotation={[0, rot, 0]}>
          <boxGeometry args={[1.0, 0.045, 0.055]} />
          <meshStandardMaterial color={color || '#1e293b'} roughness={0.2} metalness={0.85} emissive={em} emissiveIntensity={ei} />
        </mesh>
      ))}
      <mesh castShadow position={[0, -0.08, 0]}>
        <boxGeometry args={[0.45, 0.035, 0.45]} />
        <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.5} emissive={em} emissiveIntensity={ei * 0.5} />
      </mesh>
    </group>
  );
}

function MotorGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.3);
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.11, 0.135, 0.17, 20]} />
        <meshStandardMaterial color={color || '#1d4ed8'} roughness={0.15} metalness={0.92} emissive={em} emissiveIntensity={ei} />
      </mesh>
      <mesh castShadow position={[0, 0.115, 0]}>
        <cylinderGeometry args={[0.055, 0.075, 0.075, 14]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.08} metalness={1} emissive={em} emissiveIntensity={ei * 0.5} />
      </mesh>
    </group>
  );
}

// Separate animated components to ensure useFrame is stable
function AnimatedPropeller({ color, selected }) {
  const propRef = useRef();
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.4);
  
  useFrame((state, delta) => {
    if (propRef.current) propRef.current.rotation.y += delta * 5;
  });

  return (
    <group ref={propRef}>
      {[0, Math.PI / 3 * 2, Math.PI / 3 * 4].map((rot, i) => (
        <mesh key={i} rotation={[0, rot, 0]} castShadow>
          <boxGeometry args={[0.55, 0.012, 0.055]} />
          <meshStandardMaterial color={color || '#374151'} roughness={0.35} metalness={0.25} transparent opacity={0.88} emissive={em} emissiveIntensity={ei} />
        </mesh>
      ))}
    </group>
  );
}

function PropellerGeometry({ color, selected }) {
  return <AnimatedPropeller color={color} selected={selected} />;
}

function BatteryGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.2);
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.48, 0.135, 0.28]} />
        <meshStandardMaterial color={color || '#065f46'} roughness={0.42} metalness={0.28} emissive={em} emissiveIntensity={ei} />
      </mesh>
      {[-0.14, 0, 0.14].map((x, i) => (
        <mesh key={i} position={[x, 0.072, 0]}>
          <boxGeometry args={[0.085, 0.008, 0.24]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.4 + ei} />
        </mesh>
      ))}
      <mesh position={[0.265, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.045, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.92} roughness={0.08} />
      </mesh>
    </group>
  );
}

function FlightControllerGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.3);
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.33, 0.038, 0.33]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.55} metalness={0.45} emissive={em} emissiveIntensity={ei} />
      </mesh>
      <mesh castShadow position={[0, 0.028, 0]}>
        <boxGeometry args={[0.115, 0.028, 0.115]} />
        <meshStandardMaterial color={color || '#7c3aed'} roughness={0.28} metalness={0.62} emissive={em} emissiveIntensity={ei} />
      </mesh>
    </group>
  );
}

function ESCGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.25);
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.28, 0.048, 0.14]} />
        <meshStandardMaterial color={color || '#b45309'} roughness={0.42} metalness={0.42} emissive={em} emissiveIntensity={ei} />
      </mesh>
    </group>
  );
}

function CameraGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.25);
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.19, 0.19, 0.21]} />
        <meshStandardMaterial color={color || '#111827'} roughness={0.32} metalness={0.52} emissive={em} emissiveIntensity={ei} />
      </mesh>
      <mesh castShadow position={[0, 0, 0.115]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.075, 0.055, 18]} />
        <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.08} />
      </mesh>
    </group>
  );
}

function GPSGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.25);
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.038, 18]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.62} metalness={0.1} emissive={em} emissiveIntensity={ei * 0.5} />
      </mesh>
      <mesh castShadow position={[0, 0.038, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.055, 14]} />
        <meshStandardMaterial color={color || '#065f46'} roughness={0.42} metalness={0.52} emissive={em} emissiveIntensity={ei} />
      </mesh>
    </group>
  );
}

function LandingGearGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.25);
  return (
    <group>
      {[[-0.25, 0, 0], [0.25, 0, 0]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh castShadow>
            <boxGeometry args={[0.04, 0.35, 0.04]} />
            <meshStandardMaterial color={color || '#374151'} roughness={0.3} metalness={0.7} emissive={em} emissiveIntensity={ei} />
          </mesh>
          <mesh castShadow position={[0, -0.2, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.4]} />
            <meshStandardMaterial color={color || '#374151'} roughness={0.3} metalness={0.7} emissive={em} emissiveIntensity={ei} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SensorGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.3);
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.06, 0.12, 0.06]} />
        <meshStandardMaterial color={color || '#1d4ed8'} roughness={0.3} metalness={0.6} emissive={em} emissiveIntensity={ei} />
      </mesh>
    </group>
  );
}

function ArmGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.25);
  return (
    <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.025, 0.025, 0.7, 12]} />
      <meshStandardMaterial color={color || '#1e293b'} roughness={0.2} metalness={0.85} emissive={em} emissiveIntensity={ei} />
    </mesh>
  );
}

function PayloadGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.2);
  return (
    <mesh castShadow>
      <boxGeometry args={[0.35, 0.22, 0.25]} />
      <meshStandardMaterial color={color || '#1e3a8a'} roughness={0.45} metalness={0.35} emissive={em} emissiveIntensity={ei} />
    </mesh>
  );
}

function GenericGeometry({ color, selected }) {
  const em = getEmissive(selected);
  const ei = getEmissiveIntensity(selected, 0.25);
  return (
    <mesh castShadow>
      <boxGeometry args={[0.24, 0.14, 0.24]} />
      <meshStandardMaterial color={color || '#475569'} roughness={0.42} metalness={0.42} emissive={em} emissiveIntensity={ei} />
    </mesh>
  );
}

/* ─── Selection ring (rendered around selected part) ─────── */
function SelectionRing() {
  const ringRef = useRef();
  
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.8;
      ringRef.current.material.opacity = 0.55 + Math.sin(clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, -0.05, 0]}>
      {/* Use torus instead of ring to avoid rotation issues on flat ground */}
      <torusGeometry args={[0.75, 0.02, 16, 32]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} depthWrite={false} rotation={[-Math.PI / 2, 0, 0]} />
    </mesh>
  );
}

/* ─── Category → geometry map ────────────────────────────── */
const geometryMap = {
  frames: FrameGeometry,
  motors: MotorGeometry,
  propellers: PropellerGeometry,
  batteries: BatteryGeometry,
  'flight-controllers': FlightControllerGeometry,
  esc: ESCGeometry,
  cameras: CameraGeometry,
  gps: GPSGeometry,
  sensors: SensorGeometry,
  'landing-gear': LandingGearGeometry,
  arms: ArmGeometry,
  payloads: PayloadGeometry,
};

/* ─── Main part object ───────────────────────────────────── */
import { TransformControls } from '@react-three/drei';
import { useDroneStore } from '../../store/droneStore';

export default function DronePartObject({ part, isSelected, onSelect }) {
  const componentData = getComponentById(part.componentId);
  const category = componentData?.category;
  const GeomComponent = geometryMap[category] || GenericGeometry;

  const activeTool = useDroneStore(s => s.activeTool);
  const updatePartProperty = useDroneStore(s => s.updatePartProperty);

  // Convert rotation array to euler (values are stored as degrees in the UI)
  const rotRad = (part.rotation || [0, 0, 0]).map(r => (r * Math.PI) / 180);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent canvas background from deselecting
    onSelect();
  };

  const content = (
    <group onClick={handleClick}>
      <GeomComponent color={componentData?.color} selected={isSelected} />
      {isSelected && <SelectionRing />}
    </group>
  );

  if (isSelected && activeTool !== 'select') {
    const mode = activeTool === 'move' ? 'translate' : activeTool;
    return (
      <TransformControls
        mode={mode}
        position={part.position || [0, 0, 0]}
        rotation={rotRad}
        scale={part.scale || [1, 1, 1]}
        onMouseUp={(e) => {
          const obj = e.target.object;
          if (obj) {
            updatePartProperty(part.instanceId, 'position', [obj.position.x, obj.position.y, obj.position.z]);
            updatePartProperty(part.instanceId, 'rotation', [
              (obj.rotation.x * 180) / Math.PI,
              (obj.rotation.y * 180) / Math.PI,
              (obj.rotation.z * 180) / Math.PI
            ]);
            updatePartProperty(part.instanceId, 'scale', [obj.scale.x, obj.scale.y, obj.scale.z]);
          }
        }}
      >
        {content}
      </TransformControls>
    );
  }

  return (
    <group
      position={part.position || [0, 0, 0]}
      rotation={rotRad}
      scale={part.scale || [1, 1, 1]}
    >
      {content}
    </group>
  );
}

