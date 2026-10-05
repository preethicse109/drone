import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import PropertiesPanel from '../components/layout/PropertiesPanel';
import DroneCanvas from '../components/workspace/DroneCanvas';
import WorkspaceControls from '../components/workspace/WorkspaceControls';
import AssemblyDiagram from '../components/assembly/AssemblyDiagram';
import { LayoutGrid, Network } from 'lucide-react';

export default function DesignerPage() {
  const [view, setView] = useState('3d'); // '3d' | 'assembly'

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b border-slate-200 bg-white px-3 flex-shrink-0">
        {[
          { id: '3d', label: '3D Workspace', icon: LayoutGrid },
          { id: 'assembly', label: 'Assembly Diagram', icon: Network },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
              view === id
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            id={`designer-tab-${id}`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {view === '3d' ? (
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <WorkspaceControls />
            <DroneCanvas />
          </div>
          <PropertiesPanel />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <AssemblyDiagram />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="card p-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-2">Power Flow</h3>
                <div className="space-y-2">
                  {[
                    { from: 'Battery', to: 'ESC', type: 'Main Power (14.8V)', color: 'bg-emerald-500' },
                    { from: 'Battery', to: 'FC', type: 'BEC 5V', color: 'bg-blue-500' },
                    { from: 'ESC', to: 'Motors', type: '3-Phase AC', color: 'bg-amber-500' },
                  ].map(({ from, to, type, color }) => (
                    <div key={type} className="flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${color}`} />
                      <span className="text-slate-600">{from}</span>
                      <div className="flex-1 border-t border-dashed border-slate-300" />
                      <span className="text-slate-400 text-[10px]">{type}</span>
                      <div className="flex-1 border-t border-dashed border-slate-300" />
                      <span className="text-slate-600">{to}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-2">Signal Flow</h3>
                <div className="space-y-2">
                  {[
                    { from: 'Receiver', to: 'FC', type: 'SBUS/CRSF', color: 'bg-orange-500' },
                    { from: 'GPS', to: 'FC', type: 'UART', color: 'bg-cyan-500' },
                    { from: 'Camera', to: 'FC', type: 'OSD/UART', color: 'bg-pink-500' },
                    { from: 'FC', to: 'ESC', type: 'DShot600', color: 'bg-purple-500' },
                  ].map(({ from, to, type, color }) => (
                    <div key={type} className="flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${color}`} />
                      <span className="text-slate-600">{from}</span>
                      <div className="flex-1 border-t border-dashed border-slate-300" />
                      <span className="text-slate-400 text-[10px]">{type}</span>
                      <div className="flex-1 border-t border-dashed border-slate-300" />
                      <span className="text-slate-600">{to}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
