import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Cpu, Play, BookOpen, Users, ArrowRight, 
  TrendingUp, Zap, Globe, Activity, Star
} from 'lucide-react';
import { useProjectStore } from '../store/projectStore';

const stats = [
  { label: 'Components', value: '200+', icon: Cpu, color: 'text-primary-600', bg: 'bg-primary-50' },
  { label: 'Simulations', value: 'Realistic', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Tutorials', value: '6 Free', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Community', value: 'Global', icon: Globe, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const droneTypes = [
  { type: 'Racing', icon: '🏎️', desc: 'High-speed racing builds', color: 'from-red-500 to-orange-500' },
  { type: 'Photography', icon: '📸', desc: 'Stable camera platforms', color: 'from-blue-500 to-cyan-500' },
  { type: 'Survey', icon: '🗺️', desc: 'Mapping & inspection', color: 'from-purple-500 to-pink-500' },
  { type: 'Delivery', icon: '📦', desc: 'Cargo transport', color: 'from-emerald-500 to-teal-500' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { projects, createProject, formatDate } = useProjectStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Custom');

  const handleCreate = () => {
    if (!newName.trim()) return;
    createProject(newName.trim(), newType);
    setNewName('');
    setShowNewProject(false);
    navigate('/designer');
  };

  return (
    <div className="flex-1 overflow-y-auto page-transition">
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-slate-900 rounded-2xl p-8 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-20 w-64 h-64 bg-primary-300 rounded-full translate-y-1/2" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-blue bg-primary-600/50 text-primary-200 border border-primary-500/30 text-[10px] px-2 py-1">
                ✨ Browser-Based 3D Design
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to <span className="text-primary-300">DroneLab</span>
            </h1>
            <p className="text-primary-100 text-base max-w-xl mb-6">
              Design, assemble, and simulate drones in your browser. 
              From beginner to expert — build your dream drone today.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => setShowNewProject(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
                id="hero-new-project"
              >
                <Plus size={16} /> New Project
              </motion.button>
              <motion.button
                onClick={() => navigate('/designer')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm"
                id="hero-open-designer"
              >
                <Cpu size={16} /> Open Designer
              </motion.button>
              <motion.button
                onClick={() => navigate('/tutorials')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm"
                id="hero-tutorials"
              >
                <BookOpen size={16} /> Tutorials
              </motion.button>
            </div>
          </div>

          {/* Floating drone icon */}
          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-20 hidden lg:block"
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            🚁
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <motion.div
              key={label}
              className="card p-4"
              whileHover={{ y: -2 }}
            >
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <div className="text-xl font-bold text-slate-900">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Start by type */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-3">Start by Drone Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {droneTypes.map(({ type, icon, desc, color }) => (
              <motion.button
                key={type}
                onClick={() => { setNewType(type); setNewName(`My ${type} Drone`); setShowNewProject(true); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="card-hover p-4 text-left group"
                id={`quick-start-${type.toLowerCase()}`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl mb-3 shadow-sm group-hover:shadow-md transition-shadow`}>
                  {icon}
                </div>
                <div className="text-sm font-semibold text-slate-800">{type}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{desc}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent projects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900">Recent Projects</h2>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
              id="view-all-projects"
            >
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.id}
                className="card-hover p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate('/designer')}
              >
                <div className="w-full h-28 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center text-4xl">
                  🚁
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{project.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{project.droneType} • {formatDate(project.lastModified)}</div>
                  </div>
                  <span className="badge-blue text-[9px]">{project.droneType}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* New project modal */}
        {showNewProject && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4">New Drone Project</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Project Name</label>
                  <input
                    autoFocus
                    className="input"
                    placeholder="My Awesome Drone"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCreate()}
                    id="new-project-name"
                  />
                </div>
                <div>
                  <label className="label">Drone Type</label>
                  <select
                    className="input"
                    value={newType}
                    onChange={e => setNewType(e.target.value)}
                    id="new-project-type"
                  >
                    <option>Custom</option>
                    <option>Racing</option>
                    <option>Photography</option>
                    <option>Survey</option>
                    <option>Delivery</option>
                    <option>Agriculture</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowNewProject(false)} className="btn-secondary flex-1" id="cancel-new-project">Cancel</button>
                <button onClick={handleCreate} className="btn-primary flex-1" id="confirm-new-project">Create & Open</button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
