import { motion } from 'framer-motion';
import { 
  Navigation, Zap, Battery, Clock, MapPin, 
  Gauge, Radio, Compass, Activity
} from 'lucide-react';
import { useSimulationStore } from '../../store/simulationStore';

function HUDMetric({ icon: Icon, label, value, unit, color = 'text-white', warning }) {
  return (
    <div className={`flex items-center gap-2 ${warning ? 'animate-pulse' : ''}`}>
      <Icon size={13} className={warning ? 'text-red-400' : 'text-slate-400'} />
      <div>
        <div className="text-[9px] text-slate-400 uppercase tracking-wider">{label}</div>
        <div className={`text-sm font-bold leading-tight ${warning ? 'text-red-300' : color}`}>
          {value}<span className="text-xs font-normal text-slate-400 ml-0.5">{unit}</span>
        </div>
      </div>
    </div>
  );
}

function MotorStatus({ rpms }) {
  const positions = ['FL', 'FR', 'RL', 'RR'];
  const maxRPM = 12000;
  return (
    <div>
      <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1.5">Motor RPM</div>
      <div className="grid grid-cols-2 gap-1.5">
        {rpms.map((rpm, i) => {
          const pct = Math.min(100, (rpm / maxRPM) * 100);
          return (
            <div key={i} className="flex items-center gap-1.5">
              <div className="text-[9px] text-slate-500 w-5">{positions[i]}</div>
              <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-[8px] text-slate-400 w-10 text-right">{rpm.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Attitude({ pitch, roll, yaw }) {
  return (
    <div>
      <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1.5">Orientation</div>
      <div className="space-y-1">
        {[
          { label: 'Pitch', value: pitch, color: '#3b82f6' },
          { label: 'Roll', value: roll, color: '#8b5cf6' },
          { label: 'Yaw', value: yaw % 360, color: '#06b6d4' },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[9px] text-slate-500 w-7">{label}</span>
            <div className="flex-1 h-1 bg-slate-700 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute top-0 h-full w-1 rounded-full"
                style={{ backgroundColor: color }}
                animate={{ left: `${50 + (value / 180) * 50}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="text-[9px] text-slate-400 w-8 text-right">{Math.round(value)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SimulationHUD() {
  const { altitude, speed, battery, gpsLat, gpsLng, distance, flightTime, motorRPM, pitch, roll, yaw, isFlying, isEmergency } = useSimulationStore();

  const batteryWarning = battery < 20;
  const mins = Math.floor(flightTime / 60);
  const secs = Math.floor(flightTime % 60);

  return (
    <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-10">
      {/* Top HUD */}
      <div className="flex justify-between items-start">
        {/* Left panel */}
        <div className="hud-panel p-3 min-w-[200px]">
          <div className="text-[9px] text-primary-400 font-semibold uppercase tracking-widest mb-3">Flight Telemetry</div>
          <div className="space-y-2.5">
            <HUDMetric icon={Navigation} label="Altitude" value={altitude.toFixed(1)} unit="m" color="text-cyan-300" />
            <HUDMetric icon={Gauge} label="Speed" value={speed.toFixed(1)} unit="m/s" />
            <HUDMetric icon={MapPin} label="Distance" value={distance.toFixed(1)} unit="m" />
            <HUDMetric icon={Clock} label="Flight Time" value={`${mins}:${secs.toString().padStart(2, '0')}`} unit="" />
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-col gap-2 items-end">
          <motion.div
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              isEmergency ? 'bg-red-500/90 text-white' :
              isFlying ? 'bg-emerald-500/90 text-white' :
              'bg-slate-700/80 text-slate-300'
            }`}
            animate={{ scale: isFlying && !isEmergency ? [1, 1.02, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {isEmergency ? '🛑 EMERGENCY STOP' : isFlying ? '🚁 FLYING' : '⛔ GROUNDED'}
          </motion.div>
          {altitude < 120 && altitude > 0 && (
            <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-[10px] text-emerald-300">
              ✓ Airspace: CLEAR
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="hud-panel p-3 min-w-[200px]">
          <div className="text-[9px] text-primary-400 font-semibold uppercase tracking-widest mb-3">Battery & GPS</div>
          <div className="space-y-3">
            {/* Battery */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] text-slate-400 uppercase">Battery</span>
                <span className={`text-sm font-bold ${batteryWarning ? 'text-red-300' : 'text-emerald-300'}`}>
                  {battery.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-colors duration-500 ${
                    battery > 50 ? 'bg-emerald-500' :
                    battery > 20 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  animate={{ width: `${battery}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {batteryWarning && (
                <div className="text-[9px] text-red-400 mt-1 animate-pulse">⚠ Low battery — land now!</div>
              )}
            </div>

            {/* GPS */}
            <div>
              <div className="text-[9px] text-slate-400 uppercase mb-1">GPS Position</div>
              <div className="text-[10px] text-slate-300 font-mono">
                {gpsLat.toFixed(4)}°N
              </div>
              <div className="text-[10px] text-slate-300 font-mono">
                {gpsLng.toFixed(4)}°E
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end">
        <div className="hud-panel p-3 min-w-[220px]">
          <MotorStatus rpms={motorRPM} />
        </div>
        <div className="hud-panel p-3 min-w-[200px]">
          <Attitude pitch={pitch} roll={roll} yaw={yaw} />
        </div>
      </div>
    </div>
  );
}
