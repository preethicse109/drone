import { create } from 'zustand';
import { getComponentById } from '../data/components';

let nextId = 1;

const defaultDroneParts = [
  { instanceId: 'default-frame', componentId: 'frame-x250', position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-motor-1', componentId: 'motor-2206', position: [1.2, 0.1, 1.2], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-motor-2', componentId: 'motor-2206', position: [-1.2, 0.1, 1.2], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-motor-3', componentId: 'motor-2206', position: [1.2, 0.1, -1.2], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-motor-4', componentId: 'motor-2206', position: [-1.2, 0.1, -1.2], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-prop-1', componentId: 'prop-5045', position: [1.2, 0.3, 1.2], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-prop-2', componentId: 'prop-5045', position: [-1.2, 0.3, 1.2], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-prop-3', componentId: 'prop-5045', position: [1.2, 0.3, -1.2], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-prop-4', componentId: 'prop-5045', position: [-1.2, 0.3, -1.2], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-fc', componentId: 'fc-f7', position: [0, 0.15, 0], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
  { instanceId: 'default-batt', componentId: 'batt-4s1300', position: [0, -0.15, 0], rotation: [0, 0, 0], scale: [1, 1, 1], selected: false },
];

export const useDroneStore = create((set, get) => ({
  parts: defaultDroneParts,
  selectedId: null,
  history: [defaultDroneParts],
  historyIndex: 0,
  activeTool: 'select', // select | move | rotate | scale

  setActiveTool: (tool) => set({ activeTool: tool }),

  selectPart: (instanceId) => set({ selectedId: instanceId }),
  deselectAll: () => set({ selectedId: null }),

  getSelectedPart: () => {
    const { parts, selectedId } = get();
    if (!selectedId) return null;
    const part = parts.find(p => p.instanceId === selectedId);
    if (!part) return null;
    return { ...part, componentData: getComponentById(part.componentId) };
  },

  addPart: (componentId) => {
    const id = `part-${nextId++}`;
    const newPart = {
      instanceId: id,
      componentId,
      position: [Math.random() * 2 - 1, 0.5, Math.random() * 2 - 1],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      selected: false,
    };
    set(state => {
      const newParts = [...state.parts, newPart];
      return {
        parts: newParts,
        selectedId: id,
        history: [...state.history.slice(0, state.historyIndex + 1), newParts],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  deletePart: (instanceId) => {
    set(state => {
      const newParts = state.parts.filter(p => p.instanceId !== instanceId);
      return {
        parts: newParts,
        selectedId: state.selectedId === instanceId ? null : state.selectedId,
        history: [...state.history.slice(0, state.historyIndex + 1), newParts],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  duplicatePart: (instanceId) => {
    const { parts } = get();
    const part = parts.find(p => p.instanceId === instanceId);
    if (!part) return;
    const id = `part-${nextId++}`;
    const newPart = {
      ...part,
      instanceId: id,
      position: [part.position[0] + 0.5, part.position[1], part.position[2] + 0.5],
    };
    set(state => {
      const newParts = [...state.parts, newPart];
      return {
        parts: newParts,
        selectedId: id,
        history: [...state.history.slice(0, state.historyIndex + 1), newParts],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updatePartPosition: (instanceId, position) => {
    set(state => ({
      parts: state.parts.map(p => p.instanceId === instanceId ? { ...p, position } : p)
    }));
  },

  updatePartProperty: (instanceId, key, value) => {
    set(state => {
      const newParts = state.parts.map(p =>
        p.instanceId === instanceId ? { ...p, [key]: value } : p
      );
      return { parts: newParts };
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      set({
        parts: history[historyIndex - 1],
        historyIndex: historyIndex - 1,
        selectedId: null,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      set({
        parts: history[historyIndex + 1],
        historyIndex: historyIndex + 1,
      });
    }
  },

  resetToDefault: () => {
    set({
      parts: defaultDroneParts,
      selectedId: null,
      history: [defaultDroneParts],
      historyIndex: 0,
    });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}));
