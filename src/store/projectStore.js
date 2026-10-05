import { create } from 'zustand';

const STORAGE_KEY = 'dronelab-projects';

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects', e);
  }
};

const sampleProjects = [
  {
    id: 'proj-1',
    name: 'Racing Quad X250',
    droneType: 'Racing',
    lastModified: new Date(Date.now() - 86400000).toISOString(),
    thumbnail: null,
    description: 'High-performance 250mm racing quadcopter',
  },
  {
    id: 'proj-2',
    name: 'Photography Drone',
    droneType: 'Photography',
    lastModified: new Date(Date.now() - 172800000).toISOString(),
    thumbnail: null,
    description: 'Stable platform for aerial photography',
  },
  {
    id: 'proj-3',
    name: 'Survey Hexacopter',
    droneType: 'Survey',
    lastModified: new Date(Date.now() - 259200000).toISOString(),
    thumbnail: null,
    description: 'Heavy-lift 6-motor survey platform',
  },
];

export const useProjectStore = create((set, get) => ({
  projects: loadFromStorage().length > 0 ? loadFromStorage() : sampleProjects,
  activeProjectId: null,

  createProject: (name, droneType = 'Custom') => {
    const project = {
      id: `proj-${Date.now()}`,
      name,
      droneType,
      lastModified: new Date().toISOString(),
      thumbnail: null,
      description: '',
    };
    set(state => {
      const projects = [project, ...state.projects];
      saveToStorage(projects);
      return { projects, activeProjectId: project.id };
    });
    return project.id;
  },

  renameProject: (id, name) => {
    set(state => {
      const projects = state.projects.map(p =>
        p.id === id ? { ...p, name, lastModified: new Date().toISOString() } : p
      );
      saveToStorage(projects);
      return { projects };
    });
  },

  duplicateProject: (id) => {
    const { projects } = get();
    const project = projects.find(p => p.id === id);
    if (!project) return;
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`,
      name: `${project.name} (Copy)`,
      lastModified: new Date().toISOString(),
    };
    set(state => {
      const newProjects = [newProject, ...state.projects];
      saveToStorage(newProjects);
      return { projects: newProjects };
    });
  },

  deleteProject: (id) => {
    set(state => {
      const projects = state.projects.filter(p => p.id !== id);
      saveToStorage(projects);
      return {
        projects,
        activeProjectId: state.activeProjectId === id ? null : state.activeProjectId,
      };
    });
  },

  setActiveProject: (id) => set({ activeProjectId: id }),

  exportProject: (id) => {
    const { projects } = get();
    const project = projects.find(p => p.id === id);
    if (!project) return;
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s/g, '_')}.dronelab.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importProject: (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target.result);
        project.id = `proj-${Date.now()}`;
        project.lastModified = new Date().toISOString();
        set(state => {
          const projects = [project, ...state.projects];
          saveToStorage(projects);
          return { projects };
        });
      } catch (err) {
        console.error('Invalid project file', err);
      }
    };
    reader.readAsText(file);
  },

  formatDate: (isoString) => {
    const date = new Date(isoString);
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  },
}));
