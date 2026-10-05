import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Search, GripVertical } from 'lucide-react';
import { componentCategories } from '../../data/components';
import { useDroneStore } from '../../store/droneStore';

const categoryIcons = {
  frames: '🔲', motors: '⚙️', propellers: '🌀', batteries: '🔋',
  'flight-controllers': '🖥️', esc: '⚡', cameras: '📷', gps: '📡',
  sensors: '🔬', 'landing-gear': '🦾', arms: '🦿', payloads: '📦'
};

function ComponentCard({ component, onAdd }) {
  const [dragging, setDragging] = useState(false);

  return (
    <motion.div
      className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer group transition-all duration-150 ${
        dragging ? 'opacity-50' : ''
      } hover:bg-primary-50 hover:border-primary-200 border border-transparent`}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onAdd(component.id)}
      draggable
      onDragStart={(e) => {
        setDragging(true);
        e.dataTransfer.setData('componentId', component.id);
      }}
      onDragEnd={() => setDragging(false)}
      title={`Click or drag to add: ${component.name}`}
    >
      <GripVertical size={10} className="text-slate-300 group-hover:text-primary-300 flex-shrink-0" />
      <div
        className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center shadow-sm"
        style={{ backgroundColor: component.color + '20', border: `1px solid ${component.color}30` }}
      >
        <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: component.color, opacity: 0.8 }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-slate-700 group-hover:text-primary-700 truncate leading-tight">
          {component.name}
        </div>
        <div className="text-[10px] text-slate-400 truncate">{component.weight}g</div>
      </div>
    </motion.div>
  );
}

export default function Sidebar() {
  const [expandedCats, setExpandedCats] = useState(['frames', 'motors', 'propellers', 'batteries', 'flight-controllers']);
  const [search, setSearch] = useState('');
  const addPart = useDroneStore(s => s.addPart);

  const toggleCat = (id) => {
    setExpandedCats(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const filtered = search.trim()
    ? componentCategories.map(cat => ({
        ...cat,
        components: cat.components.filter(c =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )
      })).filter(cat => cat.components.length > 0)
    : componentCategories;

  return (
    <aside className="w-56 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 overflow-hidden shadow-panel">
      {/* Header */}
      <div className="px-3 py-3 border-b border-slate-100">
        <h2 className="text-xs font-bold text-slate-800 mb-2">Components</h2>
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400 bg-slate-50"
            id="sidebar-search"
          />
        </div>
      </div>

      {/* Tip */}
      <div className="px-3 py-2 bg-primary-50 border-b border-primary-100">
        <p className="text-[10px] text-primary-600">
          💡 Click to add • Drag to position
        </p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto py-1">
        {filtered.map(cat => (
          <div key={cat.id}>
            <button
              onClick={() => toggleCat(cat.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              id={`sidebar-cat-${cat.id}`}
            >
              <span>{cat.icon}</span>
              <span className="flex-1 text-left">{cat.label}</span>
              <span className="text-slate-400 text-[10px] mr-1">{cat.components.length}</span>
              {expandedCats.includes(cat.id)
                ? <ChevronDown size={12} className="text-slate-400" />
                : <ChevronRight size={12} className="text-slate-400" />
              }
            </button>

            <AnimatePresence>
              {expandedCats.includes(cat.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden px-2 pb-1"
                >
                  {cat.components.map(comp => (
                    <ComponentCard
                      key={comp.id}
                      component={comp}
                      onAdd={addPart}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </aside>
  );
}
