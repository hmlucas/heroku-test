import { Routes, Route } from "react-router-dom";
import MEmployees from "./MEmployees";
import MInventory from "./MInventory";
import MMenuItems from "./MMenuItems";
import MOrderTrends from "./MOrderTrends";
<<<<<<< HEAD
import UniversalNavbar from "../../components/UniversalNavbar";

function ManagerHome() {
  return <h1>Home View</h1>;
}
=======
import ManagerHome from "./ManagerHome";
>>>>>>> 779a9d90af0097d76e187dcf1c6bef799abac5fd

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
