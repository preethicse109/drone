import FlightMap from '../components/planner/FlightMap';

export default function PlannerPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 page-transition">
      <FlightMap />
    </div>
  );
}
