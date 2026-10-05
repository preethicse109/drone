import { motion } from 'framer-motion';
import { 
  MousePointer, Move, RotateCcw, Maximize, Trash2, Copy,
  Undo, Redo, Grid3x3, RefreshCw, Play
} from 'lucide-react';
import { useDroneStore } from '../../store/droneStore';
import { useNavigate } from 'react-router-dom';

const tools = [
  { id: 'select', icon: MousePointer, label: 'Select (S)' },
  { id: 'move', icon: Move, label: 'Move (G)' },
  { id: 'rotate', icon: RotateCcw, label: 'Rotate (R)' },
  { id: 'scale', icon: Maximize, label: 'Scale (E)' },
];

export default function WorkspaceControls() {
  const { activeTool, setActiveTool, selectedId, deletePart, duplicatePart, undo, redo, resetToDefault, canUndo, canRedo } = useDroneStore();
  const partsCount = useDroneStore(s => s.parts.length);
  const navigate = useNavigate();

  return (
    <div className="h-11 bg-white border-b border-slate-200 flex items-center px-3 gap-2 flex-shrink-0">
      {/* Tool group */}
      <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
        {tools.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            title={label}
            onClick={() => setActiveTool(id)}
            whileTap={{ scale: 0.92 }}
            className={`p-2 rounded-md transition-all duration-150 ${
              activeTool === id
                ? 'bg-white shadow-sm text-primary-600'
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
            }`}
            id={`tool-${id}`}
          >
            <Icon size={14} />
          </motion.button>
        ))}
      </div>

      <div className="w-px h-6 bg-slate-200" />

      {/* Edit actions */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={undo}
          disabled={!canUndo()}
          title="Undo (Ctrl+Z)"
          className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          id="tool-undo"
        >
          <Undo size={14} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo()}
          title="Redo (Ctrl+Y)"
          className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          id="tool-redo"
        >
          <Redo size={14} />
        </button>
      </div>

      <div className="w-px h-6 bg-slate-200" />

      {/* Component actions */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => selectedId && duplicatePart(selectedId)}
          disabled={!selectedId}
          title="Duplicate"
          className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          id="tool-duplicate"
        >
          <Copy size={14} />
        </button>
        <button
          onClick={() => selectedId && deletePart(selectedId)}
          disabled={!selectedId}
          title="Delete"
          className="p-2 rounded-md text-slate-500 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          id="tool-delete"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="w-px h-6 bg-slate-200" />

      <button
        onClick={resetToDefault}
        title="Reset to default drone"
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        id="tool-reset"
      >
        <RefreshCw size={13} />
        <span className="hidden sm:inline">Reset</span>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Part count */}
      <div className="text-xs text-slate-400">
        <span className="font-medium text-slate-600">{partsCount}</span> components
      </div>

      <div className="w-px h-6 bg-slate-200" />

      {/* Simulate button */}
      <motion.button
        onClick={() => navigate('/simulator')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-md transition-all"
        id="tool-simulate"
      >
        <Play size={13} fill="white" />
        Simulate Flight
      </motion.button>
    </div>
  );
}
