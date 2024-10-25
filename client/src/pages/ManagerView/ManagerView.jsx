import { Routes, Route } from "react-router-dom";

import MEmployees from "./MEmployees";
import MInventory from "./MInventory";
import MMenuItems from "./MMenuItems";
import MOrderTrends from "./MOrderTrends";

function ManagerHome() {
  return <h1>Home View</h1>;
}

function ManagerView() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ManagerHome />} />
        <Route path="/employees" element={<MEmployees />} />
        <Route path="/inventory" element={<MInventory />} />
        <Route path="/menu-items" element={<MMenuItems />} />
        <Route path="/order-trends" element={<MOrderTrends />} />
      </Routes>
    </div>
  );
}

export default ManagerView;
