// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./pages/HomeView";
import CashierView from "./pages/CashierView/CashierView";
import ManagerView from "./pages/ManagerView/ManagerView";
import CustomerView from "./pages/CustomerView/CustomerView";
import MenuView from "./pages/MenuView/MenuView";
import KitchenView from "./pages/KitchenView";
import CashierLogin from "./pages/CashierLogin";
import RippleEffect from "./components/RippleEffect"; // Import the RippleEffect component

function App() {
  return (
    <Router>
      <RippleEffect>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/manager-view/*" element={<ManagerView />} />
          <Route path="/cashier-login/*" element={<CashierLogin />} />
          <Route path="/cashier-view/*" element={<CashierView />} />
          <Route path="/customer-view" element={<CustomerView />} />
          <Route path="/menu-view" element={<MenuView />} />
          <Route path="/kitchen-view" element={<KitchenView />} />
        </Routes>
      </RippleEffect>
    </Router>
  );
}

export default App;
