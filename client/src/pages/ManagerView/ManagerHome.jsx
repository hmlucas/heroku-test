import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ManagerHome() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center vh-100 justify-content-center">
      <h1>Manager View</h1>
      <div className="d-flex flex-column gap-3 mt-4 w-50">
        <button
          className="btn btn-primary"
          onClick={() => navigate("employees")}
        >
          Manage Employees
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("inventory")}
        >
          Manage Inventory
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("menu-items")}
        >
          Manage Menu Items
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("order-trends")}
        >
          View Order Trends
        </button>
      </div>
    </div>
  );
}

export default ManagerHome;
