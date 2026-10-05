import { create } from 'zustand';

export const useSimulationStore = create((set, get) => ({
  isFlying: false,
  isEmergency: false,
  altitude: 0,
  targetAltitude: 0,
  speed: 0,
  battery: 100,
  gpsLat: 12.9716,
  gpsLng: 77.5946,
  distance: 0,
  flightTime: 0,
  motorRPM: [0, 0, 0, 0],
  pitch: 0,
  roll: 0,
  yaw: 0,
  dronePosition: [0, 0, 0],  // [x, y, z]
  droneVelocity: [0, 0, 0],
  timerRef: null,

  takeOff: () => {
    const { isFlying, battery } = get();
    if (isFlying || battery < 10) return;
    set({
      isFlying: true,
      isEmergency: false,
      targetAltitude: 10,
      motorRPM: [8500, 8500, 8500, 8500],
    });
  },

  land: () => {
    set({ targetAltitude: 0 });
  },

  emergencyStop: () => {
    set({
      isFlying: false,
      isEmergency: true,
      motorRPM: [0, 0, 0, 0],
      speed: 0,
      targetAltitude: 0,
      altitude: 0,
      dronePosition: [0, 0, 0],
    });
  },

  moveForward: () => {
    const { isFlying } = get();
    if (!isFlying) return;
    set(state => ({
      dronePosition: [state.dronePosition[0], state.dronePosition[1], state.dronePosition[2] - 2],
      speed: 5,
      pitch: -15,
    }));
    setTimeout(() => set({ speed: 0, pitch: 0 }), 500);
  },

  moveBackward: () => {
    const { isFlying } = get();
    if (!isFlying) return;
    set(state => ({
      dronePosition: [state.dronePosition[0], state.dronePosition[1], state.dronePosition[2] + 2],
      speed: 5,
      pitch: 15,
    }));
    setTimeout(() => set({ speed: 0, pitch: 0 }), 500);
  },

  moveLeft: () => {
    const { isFlying } = get();
    if (!isFlying) return;
    set(state => ({
      dronePosition: [state.dronePosition[0] - 2, state.dronePosition[1], state.dronePosition[2]],
      speed: 3,
      roll: -15,
    }));
    setTimeout(() => set({ speed: 0, roll: 0 }), 500);
  },

  moveRight: () => {
    const { isFlying } = get();
    if (!isFlying) return;
    set(state => ({
      dronePosition: [state.dronePosition[0] + 2, state.dronePosition[1], state.dronePosition[2]],
      speed: 3,
      roll: 15,
    }));
    setTimeout(() => set({ speed: 0, roll: 0 }), 500);
  },

  rotateCW: () => {
    const { isFlying } = get();
    if (!isFlying) return;
    set(state => ({ yaw: state.yaw + 15 }));
  },

  rotateCCW: () => {
    const { isFlying } = get();
    if (!isFlying) return;
    set(state => ({ yaw: state.yaw - 15 }));
  },

  altitudeUp: () => {
    const { isFlying } = get();
    if (!isFlying) return;
    set(state => ({ targetAltitude: Math.min(state.targetAltitude + 5, 120) }));
  },

  altitudeDown: () => {
    const { isFlying } = get();
    if (!isFlying) return;
    set(state => ({ targetAltitude: Math.max(state.targetAltitude - 5, 2) }));
  },

  tick: () => {
    const state = get();
    if (!state.isFlying && state.altitude === 0) return;

    const altDiff = state.targetAltitude - state.altitude;
    const newAltitude = Math.max(0, state.altitude + altDiff * 0.05);

    const newBattery = Math.max(0, state.battery - 0.02);
    const newFlightTime = state.flightTime + 0.1;

    const rpm = state.isFlying ? 
      [8200 + Math.random() * 600, 8200 + Math.random() * 600, 8200 + Math.random() * 600, 8200 + Math.random() * 600] :
      [0, 0, 0, 0];

    // Update GPS slightly for realism
    const newLat = state.gpsLat + (Math.random() - 0.5) * 0.0001;
    const newLng = state.gpsLng + (Math.random() - 0.5) * 0.0001;

    const newDist = Math.sqrt(
      Math.pow(state.dronePosition[0], 2) + Math.pow(state.dronePosition[2], 2)
    );

    // Check if landed
    const isFlying = newAltitude > 0.1 || state.targetAltitude > 0;

    set({
      altitude: Math.round(newAltitude * 10) / 10,
      battery: Math.round(newBattery * 10) / 10,
      flightTime: Math.round(newFlightTime * 10) / 10,
      motorRPM: rpm.map(r => Math.round(r)),
      gpsLat: Math.round(newLat * 10000) / 10000,
      gpsLng: Math.round(newLng * 10000) / 10000,
      distance: Math.round(newDist * 10) / 10,
      isFlying: isFlying && newBattery > 0,
      dronePosition: [
        state.dronePosition[0],
        newAltitude,
        state.dronePosition[2],
      ]
    });
  },

  reset: () => set({
    isFlying: false,
    isEmergency: false,
    altitude: 0,
    targetAltitude: 0,
    speed: 0,
    battery: 100,
    gpsLat: 12.9716,
    gpsLng: 77.5946,
    distance: 0,
    flightTime: 0,
    motorRPM: [0, 0, 0, 0],
    pitch: 0,
    roll: 0,
    yaw: 0,
    dronePosition: [0, 0, 0],
  }),
}));
