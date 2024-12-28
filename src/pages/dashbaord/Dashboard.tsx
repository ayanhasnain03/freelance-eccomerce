import { lazy } from "react";

const DashCount = lazy(() => import("../../components/admin/DashCount"));
const WeeklyDashboard = lazy(() => import("../../components/admin/WeeklyDashboard"));
const LatestTransaction = lazy(() => import("../../components/admin/LatestTransaction"));
const MenuBtn = lazy(() => import("../../components/admin/MenuBtn"));
const Dashboard = () => {
  return (
    <div className="releative">
      <MenuBtn/>
      <DashCount/>
<WeeklyDashboard/>
<LatestTransaction/>
    </div>
  )
}

export default Dashboard