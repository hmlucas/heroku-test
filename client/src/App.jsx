import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./pages/HomeView";
import ManagerView from "./pages/ManagerView/ManagerView";
import CashierView from "./pages/CashierView";
import CustomerView from "./pages/CustomerView";
import MenuView from "./pages/MenuView";
import KitchenView from "./pages/KitchenView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/manager-view" element={<ManagerView />} />
        <Route path="/cashier-view" element={<CashierView />} />
        <Route path="/customer-view" element={<CustomerView />} />
        <Route path="/menu-view" element={<MenuView />} />
        <Route path="/kitchen-view" element={<KitchenView />} />
      </Routes>
    </Router>
  );
}

export default App;
