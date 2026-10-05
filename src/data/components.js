// Component Library Data
export const componentCategories = [
  {
    id: 'frames',
    label: 'Frames',
    icon: '🔲',
    components: [
      { id: 'frame-x250', name: 'X250 Racing Frame', weight: 150, material: 'Carbon Fiber', arms: 4, wheelbase: 250, color: '#1e293b', desc: 'Compact racing frame for 5" props' },
      { id: 'frame-x450', name: 'X450 Quad Frame', weight: 280, material: 'Carbon Fiber', arms: 4, wheelbase: 450, color: '#374151', desc: 'Mid-size frame for photography' },
      { id: 'frame-h680', name: 'H680 Hexa Frame', weight: 420, material: 'Aluminum', arms: 6, wheelbase: 680, color: '#4b5563', desc: 'Heavy-lift hexacopter frame' },
      { id: 'frame-octo', name: 'Octo X Frame', weight: 680, material: 'Carbon Fiber', arms: 8, wheelbase: 900, color: '#111827', desc: 'Professional octocopter frame' },
    ]
  },
  {
    id: 'motors',
    label: 'Motors',
    icon: '⚙️',
    components: [
      { id: 'motor-2206', name: '2206 2300KV Motor', weight: 28, kv: 2300, voltage: '3-4S', maxRPM: 38000, power: 180, color: '#1d4ed8', desc: 'High-performance racing motor' },
      { id: 'motor-2212', name: '2212 920KV Motor', weight: 52, kv: 920, voltage: '3S', maxRPM: 15000, power: 120, color: '#2563eb', desc: 'Classic photography motor' },
      { id: 'motor-4114', name: '4114 320KV Motor', weight: 158, kv: 320, voltage: '6S', maxRPM: 8000, power: 450, color: '#1e40af', desc: 'Heavy-lift motor for large drones' },
      { id: 'motor-5010', name: '5010 270KV Motor', weight: 178, kv: 270, voltage: '6-12S', maxRPM: 7000, power: 600, color: '#1e3a8a', desc: 'Industrial heavy-lift motor' },
    ]
  },
  {
    id: 'propellers',
    label: 'Propellers',
    icon: '🌀',
    components: [
      { id: 'prop-5045', name: '5045 Tri-blade', weight: 6, diameter: 5, pitch: 4.5, blades: 3, material: 'Polycarbonate', color: '#374151', desc: 'Aggressive racing propeller' },
      { id: 'prop-1045', name: '10x4.5 Prop', weight: 18, diameter: 10, pitch: 4.5, blades: 2, material: 'ABS', color: '#4b5563', desc: 'Standard photography propeller' },
      { id: 'prop-1555', name: '15x5.5 Prop', weight: 55, diameter: 15, pitch: 5.5, blades: 2, material: 'Carbon Fiber', color: '#6b7280', desc: 'Large slow-flyer propeller' },
    ]
  },
  {
    id: 'batteries',
    label: 'Batteries',
    icon: '🔋',
    components: [
      { id: 'batt-4s1300', name: '4S 1300mAh LiPo', weight: 140, capacity: 1300, voltage: '14.8V', cells: 4, cRating: 75, color: '#065f46', desc: 'Racing battery pack' },
      { id: 'batt-3s5200', name: '3S 5200mAh LiPo', weight: 380, capacity: 5200, voltage: '11.1V', cells: 3, cRating: 25, color: '#047857', desc: 'Long-range flight battery' },
      { id: 'batt-6s10000', name: '6S 10000mAh LiPo', weight: 820, capacity: 10000, voltage: '22.2V', cells: 6, cRating: 30, color: '#059669', desc: 'Heavy-lift professional battery' },
    ]
  },
  {
    id: 'flight-controllers',
    label: 'Flight Controllers',
    icon: '🖥️',
    components: [
      { id: 'fc-f7', name: 'F7 Flight Controller', weight: 12, processor: 'STM32F7', gyro: 'ICM20689', firmware: 'Betaflight', color: '#7c3aed', desc: 'High-performance racing FC' },
      { id: 'fc-px4', name: 'Pixhawk 4 Mini', weight: 37, processor: 'STM32F7', gyro: 'ICM20689', firmware: 'PX4/ArduPilot', color: '#6d28d9', desc: 'Professional autopilot' },
      { id: 'fc-navio2', name: 'Navio2 FC', weight: 23, processor: 'RPi CM3', gyro: 'MPU9250', firmware: 'ArduPilot', color: '#5b21b6', desc: 'Raspberry Pi flight controller' },
    ]
  },
  {
    id: 'esc',
    label: 'ESC',
    icon: '⚡',
    components: [
      { id: 'esc-blheli32-35a', name: 'BLHeli32 35A ESC', weight: 8, current: 35, voltage: '3-6S', protocol: 'DShot600', color: '#b45309', desc: 'Digital protocol racing ESC' },
      { id: 'esc-4in1-45a', name: '4-in-1 45A Stack', weight: 22, current: 45, voltage: '3-6S', protocol: 'DShot1200', color: '#92400e', desc: 'Stacked 4-in-1 ESC unit' },
      { id: 'esc-80a-hv', name: '80A HV ESC', weight: 58, current: 80, voltage: '6-12S', protocol: 'PWM/OneShot', color: '#78350f', desc: 'High-voltage heavy lift ESC' },
    ]
  },
  {
    id: 'cameras',
    label: 'Cameras',
    icon: '📷',
    components: [
      { id: 'cam-fpv-runcam', name: 'RunCam Phoenix 2', weight: 22, sensor: '1/2" CMOS', fov: 155, resolution: '1200TVL', color: '#1f2937', desc: 'FPV racing camera' },
      { id: 'cam-gopro10', name: 'GoPro Hero 10', weight: 153, sensor: '1/2.3" CMOS', fov: 155, resolution: '5.3K', color: '#111827', desc: 'Action camera for cinematic footage' },
      { id: 'cam-thermal', name: 'FLIR Vue Pro', weight: 92, sensor: 'Thermal', fov: 45, resolution: '336x256', color: '#1f2937', desc: 'Thermal imaging camera' },
    ]
  },
  {
    id: 'gps',
    label: 'GPS',
    icon: '📡',
    components: [
      { id: 'gps-m8n', name: 'uBlox M8N GPS', weight: 18, chipset: 'u-blox M8N', accuracy: '2m CEP', frequency: 'GPS+GLONASS', color: '#065f46', desc: 'Standard precision GPS module' },
      { id: 'gps-m9n', name: 'uBlox M9N GPS', weight: 16, chipset: 'u-blox M9N', accuracy: '1.5m CEP', frequency: 'GPS+GLONASS+Galileo', color: '#047857', desc: 'High accuracy multi-band GPS' },
      { id: 'gps-rtk', name: 'RTK GPS Module', weight: 49, chipset: 'F9P', accuracy: '1cm RTK', frequency: 'Multi-band', color: '#065f46', desc: 'Survey-grade RTK positioning' },
    ]
  },
  {
    id: 'sensors',
    label: 'Sensors',
    icon: '🔬',
    components: [
      { id: 'sensor-lidar', name: 'TFmini Lidar', weight: 5, range: '12m', accuracy: '1cm', color: '#1d4ed8', desc: 'Obstacle avoidance lidar' },
      { id: 'sensor-flow', name: 'Optical Flow Sensor', weight: 12, range: '5m', accuracy: 'Sub-cm', color: '#2563eb', desc: 'Indoor positioning sensor' },
      { id: 'sensor-baro', name: 'Barometer Module', weight: 4, range: '0-9000m', accuracy: '0.5m', color: '#1e40af', desc: 'Altitude measurement barometer' },
    ]
  },
  {
    id: 'landing-gear',
    label: 'Landing Gear',
    icon: '🦾',
    components: [
      { id: 'gear-fixed', name: 'Fixed Landing Gear', weight: 45, material: 'Carbon Fiber', height: 60, color: '#374151', desc: 'Fixed lightweight landing skids' },
      { id: 'gear-retract', name: 'Retractable Gear', weight: 120, material: 'Aluminum', height: 80, color: '#4b5563', desc: 'Servo-driven retractable gear' },
    ]
  },
  {
    id: 'arms',
    label: 'Arms',
    icon: '🦿',
    components: [
      { id: 'arm-cf-tube', name: 'CF Tube Arm 16mm', weight: 30, material: 'Carbon Fiber', diameter: 16, length: 250, color: '#1e293b', desc: 'Round carbon fiber arm tube' },
      { id: 'arm-cf-flat', name: 'Flat CF Arm', weight: 28, material: 'Carbon Fiber', diameter: null, length: 300, color: '#111827', desc: 'Flat plate arm extension' },
    ]
  },
  {
    id: 'payloads',
    label: 'Payloads',
    icon: '📦',
    components: [
      { id: 'payload-gimbal2', name: '2-Axis Gimbal', weight: 95, axes: 2, maxPayload: 500, color: '#374151', desc: 'Camera stabilization gimbal' },
      { id: 'payload-gimbal3', name: '3-Axis Gimbal', weight: 145, axes: 3, maxPayload: 500, color: '#1f2937', desc: 'Full 3-axis camera gimbal' },
      { id: 'payload-delivery', name: 'Delivery Box', weight: 200, capacity: '2kg', material: 'ABS', color: '#1e3a8a', desc: 'Package delivery module' },
      { id: 'payload-sprayer', name: 'Agri Sprayer', weight: 350, tankCapacity: '10L', nozzles: 4, color: '#065f46', desc: 'Agricultural spray system' },
    ]
  },
];

export const getComponentById = (id) => {
  for (const cat of componentCategories) {
    const comp = cat.components.find(c => c.id === id);
    if (comp) return { ...comp, category: cat.id, categoryLabel: cat.label };
  }
  return null;
};
