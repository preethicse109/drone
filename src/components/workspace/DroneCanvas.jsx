import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useDroneStore } from '../../store/droneStore';
import DronePartObject from './DronePartObject';

function Scene() {
  const parts = useDroneStore(s => s.parts);
  const selectedId = useDroneStore(s => s.selectedId);
  const selectPart = useDroneStore(s => s.selectPart);
  const deselectAll = useDroneStore(s => s.deselectAll);

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[8, 16, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-8, 8, -8]} intensity={0.35} color="#c8d8ff" />
      <hemisphereLight skyColor="#dce8ff" groundColor="#c0c8d0" intensity={0.4} />

      {/* Grid */}
      <Grid
        args={[30, 30]}
        cellSize={0.5}
        cellThickness={0.4}
        cellColor="#b0c4d8"
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor="#8aa8c0"
        fadeDistance={30}
        fadeStrength={1.2}
        infiniteGrid
        position={[0, -0.002, 0]}
      />

      {/* Invisible ground — click to deselect */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.003, 0]}
        onClick={(e) => { e.stopPropagation(); deselectAll(); }}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Parts */}
      {parts.map(part => (
        <DronePartObject
          key={part.instanceId}
          part={part}
          isSelected={part.instanceId === selectedId}
          onSelect={() => selectPart(part.instanceId)}
        />
      ))}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.07}
        minDistance={1.5}
        maxDistance={28}
        target={[0, 0.2, 0]}
      />

      <GizmoHelper alignment="bottom-right" margin={[72, 72]}>
        <GizmoViewport
          axisColors={['#ef4444', '#22c55e', '#3b82f6']}
          labelColor="white"
        />
      </GizmoHelper>
    </>
  );
}

export default function DroneCanvas() {
  const addPart = useDroneStore(s => s.addPart);
  const deselectAll = useDroneStore(s => s.deselectAll);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('componentId');
    if (id) addPart(id);
  };

  return (
    <div
      className="flex-1 overflow-hidden"
      style={{ position: 'relative', background: 'linear-gradient(150deg, #e4ecf5 0%, #cdd8e5 100%)' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      id="drone-canvas-container"
    >
      {/* Subtle dot grid background */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #9ab0c8 1px, transparent 1px)',
          backgroundSize: '28px 28px', opacity: 0.35,
        }}
      />

      {/* R3F Canvas — fills parent via CSS */}
      <Canvas
        camera={{ position: [5, 4, 6], fov: 50, near: 0.01, far: 500 }}
        shadows="soft"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        onPointerMissed={deselectAll}
      >
        <Scene />
      </Canvas>

      {/* Controls hint */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 10 }}>
        <div style={{
          background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.6)', borderRadius: 999,
          padding: '5px 14px', fontSize: 10, color: '#64748b',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }}>
          <span>🖱️</span>
          <span><b>Left-drag</b> orbit</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span><b>Scroll</b> zoom</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span><b>Right-drag</b> pan</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span><b>Click part</b> to select</span>
        </div>
      </div>
    </div>
  );
}
