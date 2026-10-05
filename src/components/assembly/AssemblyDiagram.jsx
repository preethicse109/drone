import { motion } from 'framer-motion';

// Connection data
const nodes = [
  { id: 'battery', label: 'Battery', x: 300, y: 260, color: '#10b981', icon: '🔋' },
  { id: 'esc', label: 'ESC ×4', x: 300, y: 160, color: '#f59e0b', icon: '⚡' },
  { id: 'motors', label: 'Motors ×4', x: 300, y: 60, color: '#3b82f6', icon: '⚙️' },
  { id: 'fc', label: 'Flight Controller', x: 160, y: 160, color: '#8b5cf6', icon: '🖥️' },
  { id: 'gps', label: 'GPS', x: 60, y: 80, color: '#06b6d4', icon: '📡' },
  { id: 'camera', label: 'Camera', x: 60, y: 240, color: '#ec4899', icon: '📷' },
  { id: 'rx', label: 'Receiver', x: 440, y: 160, color: '#f97316', icon: '📻' },
];

const connections = [
  { from: 'battery', to: 'esc', label: 'Power', color: '#10b981' },
  { from: 'esc', to: 'motors', label: '3-phase AC', color: '#f59e0b' },
  { from: 'esc', to: 'fc', label: 'Signal (DShot)', color: '#8b5cf6', dashed: true },
  { from: 'battery', to: 'fc', label: 'BEC 5V', color: '#10b981', dashed: true },
  { from: 'gps', to: 'fc', label: 'UART', color: '#06b6d4', dashed: true },
  { from: 'camera', to: 'fc', label: 'OSD/UART', color: '#ec4899', dashed: true },
  { from: 'rx', to: 'fc', label: 'SBUS/CRSF', color: '#f97316', dashed: true },
];

function getNode(id) {
  return nodes.find(n => n.id === id);
}

export default function AssemblyDiagram() {
  const svgW = 500;
  const svgH = 340;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 overflow-hidden">
      <h3 className="text-sm font-semibold text-slate-800 mb-1">System Wiring Diagram</h3>
      <p className="text-xs text-slate-500 mb-4">Visual representation of component interconnections</p>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH} className="font-sans">
          <defs>
            <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#10b981" />
            </marker>
            <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#8b5cf6" />
            </marker>
            <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#06b6d4" />
            </marker>
            <marker id="arrow-pink" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#ec4899" />
            </marker>
            <marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#f97316" />
            </marker>
            <style>{`
              .conn-line { animation: dash 2s linear infinite; }
              @keyframes dash { to { stroke-dashoffset: -20; } }
            `}</style>
          </defs>

          {/* Connection lines */}
          {connections.map((conn, i) => {
            const from = getNode(conn.from);
            const to = getNode(conn.to);
            if (!from || !to) return null;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            const markerColor = conn.color.replace('#', '');
            const markerId = `arrow-${
              conn.color === '#10b981' ? 'green' :
              conn.color === '#f59e0b' ? 'amber' :
              conn.color === '#8b5cf6' ? 'purple' :
              conn.color === '#06b6d4' ? 'cyan' :
              conn.color === '#ec4899' ? 'pink' :
              'orange'
            }`;
            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={conn.color}
                  strokeWidth={conn.dashed ? 1.5 : 2.5}
                  strokeDasharray={conn.dashed ? "5,5" : "none"}
                  strokeDashoffset="0"
                  className={conn.dashed ? "conn-line" : ""}
                  markerEnd={`url(#${markerId})`}
                  opacity={0.8}
                />
                <rect
                  x={midX - 22} y={midY - 8}
                  width={44} height={16}
                  rx={4} fill="white"
                  stroke={conn.color} strokeWidth={0.8}
                  opacity={0.9}
                />
                <text
                  x={midX} y={midY + 4}
                  textAnchor="middle"
                  fontSize={8}
                  fill={conn.color}
                  fontWeight="500"
                >
                  {conn.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x} cy={node.y} r={30}
                fill={node.color + '18'}
                stroke={node.color}
                strokeWidth={2}
              />
              <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize={16}>
                {node.icon}
              </text>
              <text
                x={node.x} y={node.y + 12}
                textAnchor="middle" fontSize={7.5}
                fill={node.color} fontWeight="700"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 bg-slate-700 rounded" />
          <span className="text-[10px] text-slate-500">Power</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0 border-t border-dashed border-slate-500" />
          <span className="text-[10px] text-slate-500">Signal</span>
        </div>
      </div>
    </div>
  );
}
