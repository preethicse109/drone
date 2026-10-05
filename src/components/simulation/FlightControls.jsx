import { motion } from 'framer-motion';
import { 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  RotateCcw, RotateCw, TrendingUp, TrendingDown,
  AlertOctagon, Plane, PlaneLanding
} from 'lucide-react';
import { useSimulationStore } from '../../store/simulationStore';

function ControlButton({ id, icon: Icon, label, onClick, variant = 'default', size = 'normal' }) {
  const variants = {
    default: 'bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-600/50',
    primary: 'bg-primary-600/80 hover:bg-primary-500/80 text-white border border-primary-500/50',
    success: 'bg-emerald-600/80 hover:bg-emerald-500/80 text-white border border-emerald-500/50',
    danger: 'bg-red-600/80 hover:bg-red-500/80 text-white border border-red-500/50',
    warning: 'bg-amber-500/80 hover:bg-amber-400/80 text-white border border-amber-400/50',
  };

  return (
    <motion.button
      id={id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-1 rounded-xl backdrop-blur-sm transition-all duration-150 
        ${variants[variant]}
        ${size === 'large' ? 'p-3 min-w-[64px]' : 'p-2 min-w-[48px]'}
      `}
      title={label}
    >
      <Icon size={size === 'large' ? 20 : 16} />
      <span className={`font-medium leading-none ${size === 'large' ? 'text-[10px]' : 'text-[9px]'}`}>{label}</span>
    </motion.button>
  );
}

export default function FlightControls() {
  const sim = useSimulationStore();
  
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto z-20">
      <div className="hud-panel p-3">
        <div className="text-[9px] text-primary-400 font-semibold uppercase tracking-widest text-center mb-3">
          Flight Controls
        </div>
        
        <div className="flex items-end gap-3">
          {/* Take Off / Land */}
          <div className="flex flex-col gap-2">
            <ControlButton
              id="ctrl-takeoff"
              icon={Plane}
              label="Take Off"
              onClick={sim.takeOff}
              variant="success"
              size="large"
            />
            <ControlButton
              id="ctrl-land"
              icon={PlaneLanding}
              label="Land"
              onClick={sim.land}
              variant="warning"
              size="large"
            />
          </div>

          <div className="w-px h-16 bg-slate-700" />

          {/* Directional */}
          <div className="flex flex-col items-center gap-1">
            <ControlButton id="ctrl-forward" icon={ArrowUp} label="Fwd" onClick={sim.moveForward} />
            <div className="flex gap-1">
              <ControlButton id="ctrl-left" icon={ArrowLeft} label="Left" onClick={sim.moveLeft} />
              <div className="w-10 h-10 rounded-xl bg-slate-700/40 border border-slate-600/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              </div>
              <ControlButton id="ctrl-right" icon={ArrowRight} label="Right" onClick={sim.moveRight} />
            </div>
            <ControlButton id="ctrl-backward" icon={ArrowDown} label="Back" onClick={sim.moveBackward} />
          </div>

          <div className="w-px h-16 bg-slate-700" />

          {/* Altitude + Rotate */}
          <div className="flex flex-col gap-1">
            <ControlButton id="ctrl-alt-up" icon={TrendingUp} label="Up" onClick={sim.altitudeUp} />
            <div className="flex gap-1">
              <ControlButton id="ctrl-rot-ccw" icon={RotateCcw} label="CCW" onClick={sim.rotateCCW} />
              <ControlButton id="ctrl-rot-cw" icon={RotateCw} label="CW" onClick={sim.rotateCW} />
            </div>
            <ControlButton id="ctrl-alt-down" icon={TrendingDown} label="Down" onClick={sim.altitudeDown} />
          </div>

          <div className="w-px h-16 bg-slate-700" />

          {/* Emergency */}
          <motion.button
            id="ctrl-emergency"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={sim.emergencyStop}
            className="flex flex-col items-center justify-center gap-1 p-3 bg-red-600 hover:bg-red-500 text-white rounded-xl border border-red-400 min-w-[64px]"
          >
            <AlertOctagon size={20} />
            <span className="text-[9px] font-bold">STOP</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
