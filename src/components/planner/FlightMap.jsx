import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Trash2, Navigation, Clock, Zap, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icon issue in webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const airspaceZones = [
  { center: [12.99, 77.62], radius: 3000, type: 'restricted', label: 'Airport Zone' },
  { center: [12.95, 77.55], radius: 1500, type: 'caution', label: 'Helipad Area' },
  { center: [12.97, 77.51], radius: 800, type: 'safe', label: 'Open Zone' },
];

const zoneColors = {
  restricted: { color: '#ef4444', fill: '#ef444420' },
  caution: { color: '#f59e0b', fill: '#f59e0b20' },
  safe: { color: '#10b981', fill: '#10b98120' },
};

function MapClickHandler({ onMapClick }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng) });
  return null;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function FlightMap() {
  const [waypoints, setWaypoints] = useState([
    { lat: 12.9716, lng: 77.5946, altitude: 30, speed: 5, id: 1 },
    { lat: 12.9750, lng: 77.5980, altitude: 50, speed: 8, id: 2 },
  ]);
  const [showAirspace, setShowAirspace] = useState(true);
  const [warning, setWarning] = useState(null);
  let nextId = waypoints.length + 1;

  const handleMapClick = (latlng) => {
    const newWp = { lat: latlng.lat, lng: latlng.lng, altitude: 30, speed: 5, id: nextId++ };
    setWaypoints(prev => [...prev, newWp]);
    
    // Check airspace
    for (const zone of airspaceZones) {
      const dist = haversineDistance(latlng.lat, latlng.lng, zone.center[0], zone.center[1]);
      if (dist < zone.radius && zone.type === 'restricted') {
        setWarning(`⚠️ Waypoint placed in restricted zone: ${zone.label}`);
        setTimeout(() => setWarning(null), 4000);
        break;
      }
    }
  };

  const removeWaypoint = (id) => setWaypoints(prev => prev.filter(w => w.id !== id));
  const updateWaypoint = (id, key, value) => {
    setWaypoints(prev => prev.map(w => w.id === id ? { ...w, [key]: value } : w));
  };

  const totalDist = waypoints.reduce((acc, wp, i) => {
    if (i === 0) return acc;
    return acc + haversineDistance(waypoints[i - 1].lat, waypoints[i - 1].lng, wp.lat, wp.lng);
  }, 0);

  const avgSpeed = waypoints.reduce((a, w) => a + w.speed, 0) / Math.max(1, waypoints.length);
  const estTime = avgSpeed > 0 ? totalDist / avgSpeed : 0;

  const linePositions = waypoints.map(w => [w.lat, w.lng]);

  return (
    <div className="flex flex-col gap-4 page-transition">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Flight Path Planner</h1>
        <p className="text-sm text-slate-500">Click on the map to add waypoints and plan your mission</p>
      </div>

      {/* Warning */}
      <AnimatePresence>
        {warning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
          >
            <AlertTriangle size={16} />
            {warning}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 flex-1">
        {/* Map */}
        <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 shadow-card min-h-[480px]">
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={14}
            style={{ height: '100%', minHeight: 480 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />
            <MapClickHandler onMapClick={handleMapClick} />

            {/* Airspace zones */}
            {showAirspace && airspaceZones.map((zone, i) => (
              <Circle
                key={i}
                center={zone.center}
                radius={zone.radius}
                color={zoneColors[zone.type].color}
                fillColor={zoneColors[zone.type].fill}
                fillOpacity={0.4}
                weight={2}
              >
                <Popup>{zone.label} — {zone.type.toUpperCase()}</Popup>
              </Circle>
            ))}

            {/* Flight path line */}
            {linePositions.length > 1 && (
              <Polyline
                positions={linePositions}
                color="#3b82f6"
                weight={3}
                dashArray="8, 4"
              />
            )}

            {/* Waypoints */}
            {waypoints.map((wp, i) => (
              <Marker key={wp.id} position={[wp.lat, wp.lng]}>
                <Popup>
                  <div className="text-xs">
                    <strong>Waypoint {i + 1}</strong><br />
                    Alt: {wp.altitude}m | Speed: {wp.speed} m/s
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Side panel */}
        <div className="w-72 flex flex-col gap-3">
          {/* Controls */}
          <div className="card p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-700">Airspace Layer</span>
              <button
                onClick={() => setShowAirspace(v => !v)}
                className={`relative w-10 h-5 rounded-full transition-colors ${showAirspace ? 'bg-primary-500' : 'bg-slate-300'}`}
                id="airspace-toggle"
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${showAirspace ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            {/* Airspace legend */}
            <div className="space-y-1.5">
              {[
                { color: '#10b981', label: 'Safe Zone' },
                { color: '#f59e0b', label: 'Caution Zone' },
                { color: '#ef4444', label: 'Restricted Zone' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full opacity-70" style={{ backgroundColor: color }} />
                  <span className="text-[11px] text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission stats */}
          <div className="card p-3">
            <div className="text-xs font-semibold text-slate-700 mb-2">Mission Summary</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Navigation, label: 'Distance', value: `${(totalDist / 1000).toFixed(2)} km` },
                { icon: Clock, label: 'Est. Time', value: `${Math.ceil(estTime / 60)} min` },
                { icon: MapPin, label: 'Waypoints', value: waypoints.length },
                { icon: Zap, label: 'Avg Speed', value: `${avgSpeed.toFixed(1)} m/s` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon size={11} className="text-primary-500" />
                    <span className="text-[10px] text-slate-500">{label}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Waypoint list */}
          <div className="card p-3 flex-1 overflow-hidden">
            <div className="text-xs font-semibold text-slate-700 mb-2">Waypoints</div>
            <div className="space-y-2 overflow-y-auto max-h-[220px]">
              {waypoints.map((wp, i) => (
                <motion.div
                  key={wp.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-50 rounded-lg p-2"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-[9px] font-bold">
                        {i + 1}
                      </div>
                      <span className="text-[10px] font-medium text-slate-600">
                        {i === 0 ? '🛫 Takeoff' : i === waypoints.length - 1 ? '🛬 Landing' : `Waypoint ${i + 1}`}
                      </span>
                    </div>
                    <button onClick={() => removeWaypoint(wp.id)} className="p-0.5 rounded hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={11} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <label className="text-[9px] text-slate-400">Alt (m)</label>
                      <input
                        type="number"
                        value={wp.altitude}
                        onChange={e => updateWaypoint(wp.id, 'altitude', +e.target.value)}
                        min={5} max={120}
                        className="w-full text-[10px] px-1.5 py-0.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-400"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400">Speed (m/s)</label>
                      <input
                        type="number"
                        value={wp.speed}
                        onChange={e => updateWaypoint(wp.id, 'speed', +e.target.value)}
                        min={1} max={20}
                        className="w-full text-[10px] px-1.5 py-0.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-400"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => handleMapClick({ lat: 12.9716 + Math.random() * 0.02, lng: 77.5946 + Math.random() * 0.02 })}
              className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 text-[10px] font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
              id="add-waypoint-btn"
            >
              <Plus size={11} /> Add Waypoint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
