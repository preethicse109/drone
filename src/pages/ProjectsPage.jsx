import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, MoreVertical, Pencil, Copy, Trash2, Download, Upload, FolderOpen, Check, X } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { useNavigate } from 'react-router-dom';

const droneTypeColors = {
  Racing: 'from-red-400 to-orange-500',
  Photography: 'from-blue-400 to-cyan-500',
  Survey: 'from-purple-400 to-pink-500',
  Delivery: 'from-emerald-400 to-teal-500',
  Agriculture: 'from-lime-400 to-green-500',
  Custom: 'from-slate-400 to-slate-600',
};

const droneTypeIcon = {
  Racing: '🏎️', Photography: '📸', Survey: '🗺️',
  Delivery: '📦', Agriculture: '🌾', Custom: '🚁',
};

function ProjectCard({ project, onOpen, onRename, onDuplicate, onDelete, onExport }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const { formatDate } = useProjectStore();

  const handleRename = () => {
    if (editName.trim()) onRename(project.id, editName.trim());
    setEditing(false);
  };

  const gradient = droneTypeColors[project.droneType] || droneTypeColors.Custom;
  const icon = droneTypeIcon[project.droneType] || '🚁';

  return (
    <motion.div
      className="card group overflow-hidden"
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
      layout
    >
      {/* Thumbnail */}
      <div
        className={`w-full h-36 bg-gradient-to-br ${gradient} flex items-center justify-center cursor-pointer relative overflow-hidden`}
        onClick={onOpen}
      >
        <motion.div
          className="text-5xl"
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          {icon}
        </motion.div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="bg-white/90 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <FolderOpen size={13} /> Open Project
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        {editing ? (
          <div className="flex gap-1">
            <input
              autoFocus
              className="input text-xs py-1 flex-1"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setEditing(false); }}
            />
            <button onClick={handleRename} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"><Check size={13} /></button>
            <button onClick={() => setEditing(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded"><X size={13} /></button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-800 truncate">{project.name}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                <span className="mr-1">{project.droneType}</span>•<span className="ml-1">{formatDate(project.lastModified)}</span>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                id={`project-menu-${project.id}`}
              >
                <MoreVertical size={14} />
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    className="absolute right-0 top-7 z-10 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-36"
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    {[
                      { icon: FolderOpen, label: 'Open', action: onOpen, cls: 'text-primary-600' },
                      { icon: Pencil, label: 'Rename', action: () => { setEditing(true); setMenuOpen(false); }, cls: '' },
                      { icon: Copy, label: 'Duplicate', action: () => { onDuplicate(project.id); setMenuOpen(false); }, cls: '' },
                      { icon: Download, label: 'Export', action: () => { onExport(project.id); setMenuOpen(false); }, cls: '' },
                      { icon: Trash2, label: 'Delete', action: () => { onDelete(project.id); setMenuOpen(false); }, cls: 'text-red-600' },
                    ].map(({ icon: Icon, label, action, cls }) => (
                      <button
                        key={label}
                        onClick={action}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-slate-50 transition-colors ${cls || 'text-slate-700'}`}
                      >
                        <Icon size={12} /> {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { projects, createProject, renameProject, duplicateProject, deleteProject, exportProject, importProject, formatDate } = useProjectStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Custom');
  const fileInputRef = useRef();

  const filtered = projects
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === 'date' ? new Date(b.lastModified) - new Date(a.lastModified) :
      sort === 'name' ? a.name.localeCompare(b.name) : 0
    );

  const handleCreate = () => {
    if (!newName.trim()) return;
    createProject(newName.trim(), newType);
    setNewName('');
    setShowCreate(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 page-transition">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">My Projects</h1>
            <p className="text-sm text-slate-500">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary btn-sm"
              id="import-project"
            >
              <Upload size={13} /> Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={e => { if (e.target.files[0]) importProject(e.target.files[0]); }}
            />
            <button
              onClick={() => setShowCreate(true)}
              className="btn-primary btn-sm"
              id="new-project-btn"
            >
              <Plus size={13} /> New Project
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search projects..."
              className="input pl-8 text-xs py-2"
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="projects-search"
            />
          </div>
          <select
            className="input text-xs py-2 w-36"
            value={sort}
            onChange={e => setSort(e.target.value)}
            id="projects-sort"
          >
            <option value="date">Last Modified</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📁</div>
            <div className="text-slate-500 text-sm">No projects found</div>
            <button onClick={() => setShowCreate(true)} className="btn-primary mt-4">
              <Plus size={14} /> Create Your First Project
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map(project => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ProjectCard
                    project={project}
                    onOpen={() => navigate('/designer')}
                    onRename={renameProject}
                    onDuplicate={duplicateProject}
                    onDelete={deleteProject}
                    onExport={exportProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Create modal */}
      {showCreate && (
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
                <input autoFocus className="input" placeholder="My Awesome Drone" value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreate()} id="create-project-name" />
              </div>
              <div>
                <label className="label">Drone Type</label>
                <select className="input" value={newType} onChange={e => setNewType(e.target.value)} id="create-project-type">
                  {['Custom', 'Racing', 'Photography', 'Survey', 'Delivery', 'Agriculture'].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleCreate} className="btn-primary flex-1">Create Project</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
