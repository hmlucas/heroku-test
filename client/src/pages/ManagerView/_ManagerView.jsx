import { Routes, Route } from "react-router-dom";

import Employees from "./Employees";
import MenuView from "./MenuView";
import Inventory from "./Inventory";
import OrderTrends from "./OrderTrends";

function HomeView() {
  return <h1>Home View</h1>;
}

function ManagerView() {
  return (
    <div>
      {/*//TODO Shared manager components */}
      <h2>Manager View</h2>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/order-trends" element={<OrderTrends />} />
        <Route path="/menu-view" element={<MenuView />} />
      </Routes>
    </div>
  );
}

export default ManagerView;
