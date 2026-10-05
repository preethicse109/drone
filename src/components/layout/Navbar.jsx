import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Cpu, Play, FolderOpen, BookOpen, 
  Users, HelpCircle, Bell, ChevronDown, Zap, User
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/designer', label: '3D Designer', icon: Cpu },
  { to: '/simulator', label: 'Simulator', icon: Play },
  { to: '/planner', label: 'Planner', icon: Zap },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/tutorials', label: 'Tutorials', icon: BookOpen },
  { to: '/community', label: 'Community', icon: Users },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-4 z-50 relative shadow-sm flex-shrink-0">
      {/* Logo */}
      <motion.div
        className="flex items-center gap-2 cursor-pointer mr-4"
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" fill="white" opacity="0.9"/>
            <circle cx="12" cy="12" r="2.5" fill="white"/>
          </svg>
        </div>
        <div>
          <span className="font-bold text-slate-900 text-sm leading-none">DroneLab</span>
          <div className="text-[9px] text-primary-600 font-medium leading-none mt-0.5">DESIGN STUDIO</div>
        </div>
      </motion.div>

      {/* Nav Links */}
      <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Icon size={13} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto flex-shrink-0">
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors" id="navbar-notifications">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors" id="navbar-profile">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <User size={12} className="text-white" />
          </div>
          <span className="text-xs font-medium text-slate-700">Alex Chen</span>
          <ChevronDown size={12} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}
