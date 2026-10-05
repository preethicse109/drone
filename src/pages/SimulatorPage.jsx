import { useEffect } from 'react';
import { RefreshCw, ArrowLeft, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SimulationCanvas from '../components/simulation/SimulationCanvas';
import SimulationHUD from '../components/simulation/SimulationHUD';
import FlightControls from '../components/simulation/FlightControls';
import { useSimulationStore } from '../store/simulationStore';

export default function SimulatorPage() {
  const navigate = useNavigate();
  const reset = useSimulationStore(s => s.reset);

  useEffect(() => {
    reset();
    // Hide the navbar for true full-screen feel
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    // Fixed overlay that covers the ENTIRE viewport, including over the navbar
    <div
      className="fixed inset-0 z-[100] bg-slate-950 flex flex-col"
      id="simulator-fullscreen"
    >
      {/* Thin top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/60 z-10">
        <button
          onClick={() => navigate('/designer')}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors group"
          id="sim-back"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Designer
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span className="text-xs text-slate-300 font-semibold tracking-wide uppercase">
              Simulation Mode
            </span>
          </div>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors group"
          id="sim-reset"
        >
          <RefreshCw size={13} className="group-hover:rotate-180 transition-transform duration-500" />
          Reset
        </button>
      </div>

      {/* Full-screen 3D canvas area */}
      <div className="flex-1 relative overflow-hidden">
        <SimulationCanvas />
        <SimulationHUD />
        <FlightControls />
      </div>
    </div>
  );
}
