import { Routes, Route } from "react-router-dom";
import MEmployees from "./MEmployees";
import MInventory from "./MInventory";
import MMenuItems from "./MMenuItems";
import MOrderTrends from "./MOrderTrends";
import UniversalNavbar from "../../components/UniversalNavbar";
import ManagerHome from "./ManagerHome";

function ManagerView() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ManagerHome />} />
        <Route path="employees" element={<MEmployees />} />
        <Route path="inventory" element={<MInventory />} />
        <Route path="menu-items" element={<MMenuItems />} />
        <Route path="order-trends" element={<MOrderTrends />} />
      </Routes>
      <UniversalNavbar />
    </div>
  );
}

export default ManagerView;
