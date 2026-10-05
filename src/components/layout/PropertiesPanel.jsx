import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Copy, ChevronRight } from 'lucide-react';
import { useDroneStore } from '../../store/droneStore';

const fieldLabels = {
  weight: { label: 'Weight', unit: 'g' },
  kv: { label: 'KV Rating', unit: 'KV' },
  voltage: { label: 'Voltage', unit: '' },
  maxRPM: { label: 'Max RPM', unit: 'RPM' },
  power: { label: 'Power', unit: 'W' },
  material: { label: 'Material', unit: '' },
  arms: { label: 'Arms', unit: '' },
  wheelbase: { label: 'Wheelbase', unit: 'mm' },
  capacity: { label: 'Capacity', unit: 'mAh' },
  cells: { label: 'Cells', unit: 'S' },
  cRating: { label: 'C Rating', unit: 'C' },
  processor: { label: 'Processor', unit: '' },
  gyro: { label: 'Gyro', unit: '' },
  firmware: { label: 'Firmware', unit: '' },
  current: { label: 'Current', unit: 'A' },
  protocol: { label: 'Protocol', unit: '' },
  sensor: { label: 'Sensor', unit: '' },
  fov: { label: 'Field of View', unit: '°' },
  resolution: { label: 'Resolution', unit: '' },
  chipset: { label: 'Chipset', unit: '' },
  accuracy: { label: 'Accuracy', unit: '' },
  frequency: { label: 'Frequency', unit: '' },
  diameter: { label: 'Diameter', unit: '"' },
  pitch: { label: 'Pitch', unit: '"' },
  blades: { label: 'Blades', unit: '' },
  range: { label: 'Range', unit: '' },
  height: { label: 'Height', unit: 'mm' },
  length: { label: 'Length', unit: 'mm' },
  axes: { label: 'Axes', unit: '' },
  maxPayload: { label: 'Max Payload', unit: 'g' },
  capacity: { label: 'Capacity', unit: '' },
  nozzles: { label: 'Nozzles', unit: '' },
  tankCapacity: { label: 'Tank', unit: '' },
};

const skipFields = ['id', 'color', 'desc', 'name'];

export default function PropertiesPanel() {
  const { selectedId, deletePart, duplicatePart, deselectAll, updatePartProperty } = useDroneStore();
  const selected = useDroneStore(s => s.getSelectedPart());

  if (!selected) {
    return (
      <aside className="w-56 bg-white border-l border-slate-200 flex flex-col flex-shrink-0 shadow-panel-right">
        <div className="px-3 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold text-slate-800">Properties</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
            🔩
          </div>
          <div>
            <p className="text-xs font-medium text-slate-600">No component selected</p>
            <p className="text-[10px] text-slate-400 mt-1">Click a component in the 3D workspace to inspect and edit its properties</p>
          </div>
        </div>
      </aside>
    );
  }

  const { componentData, instanceId } = selected;
  const displayFields = Object.entries(componentData || {}).filter(
    ([key]) => !skipFields.includes(key) && fieldLabels[key]
  );

  return (
    <motion.aside
      className="w-56 bg-white border-l border-slate-200 flex flex-col flex-shrink-0 shadow-panel-right overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="px-3 py-3 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-800">Properties</h2>
        <button
          onClick={deselectAll}
          className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          id="properties-close"
        >
          <X size={13} />
        </button>
      </div>

      {/* Component name + type */}
      <div className="px-3 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: componentData?.color + '20' }}
          >
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: componentData?.color }} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-800 truncate">{componentData?.name}</div>
            <div className="text-[10px] text-slate-500 capitalize">{componentData?.categoryLabel}</div>
          </div>
        </div>
        {componentData?.desc && (
          <p className="text-[10px] text-slate-500 leading-relaxed mt-2">{componentData.desc}</p>
        )}
      </div>

      {/* Specs */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Specifications</div>
          <div className="space-y-2">
            {displayFields.map(([key, value]) => {
              const info = fieldLabels[key];
              if (!info) return null;
              return (
                <div key={key} className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 flex-shrink-0">{info.label}</span>
                  <span className="text-[10px] font-medium text-slate-800 text-right">
                    {value}{info.unit ? ` ${info.unit}` : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transform */}
        <div className="px-3 py-2 border-t border-slate-100">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Transform</div>
          <div className="space-y-2">
            {['position', 'rotation', 'scale'].map(prop => (
              <div key={prop}>
                <div className="text-[10px] text-slate-500 mb-1 capitalize">{prop}</div>
                <div className="grid grid-cols-3 gap-1">
                  {['X', 'Y', 'Z'].map((axis, i) => (
                    <div key={axis} className="flex flex-col">
                      <span className="text-[9px] text-slate-400 text-center">{axis}</span>
                      <input
                        type="number"
                        step={prop === 'scale' ? 0.1 : prop === 'rotation' ? 5 : 0.1}
                        value={Math.round((selected[prop]?.[i] ?? 0) * 100) / 100}
                        onChange={e => {
                          const val = parseFloat(e.target.value);
                          if (isNaN(val)) return;
                          const arr = [...(selected[prop] || [0,0,0])];
                          arr[i] = val;
                          updatePartProperty(instanceId, prop, arr);
                        }}
                        className="text-[10px] text-center border border-slate-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary-400 bg-slate-50"
                        id={`prop-${prop}-${axis.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-3 py-3 border-t border-slate-100 flex gap-2">
        <button
          onClick={() => duplicatePart(instanceId)}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          id="properties-duplicate"
        >
          <Copy size={11} /> Duplicate
        </button>
        <button
          onClick={() => deletePart(instanceId)}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          id="properties-delete"
        >
          <Trash2 size={11} /> Delete
        </button>
      </div>
    </motion.aside>
  );
}
