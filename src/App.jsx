import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import DesignerPage from './pages/DesignerPage';
import SimulatorPage from './pages/SimulatorPage';
import PlannerPage from './pages/PlannerPage';
import ProjectsPage from './pages/ProjectsPage';
import TutorialsPage from './pages/TutorialsPage';
import CommunityPage from './pages/CommunityPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Navbar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/designer" element={<DesignerPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
