import "./CashierView.css";
import "./SalesMenu.css";
import { useEffect } from "react";
import useEmployeeStore from "../../store/useEmployeeStore";

function SalesMenu() {
  const { selectedEmployee, fetchEmployeeById } = useEmployeeStore();

  useEffect(() => {
    fetchEmployeeById(1); // fetch current active employee //TODO make this use current employee (remove the fetch?)
  }, [fetchEmployeeById]);

  return (
    <div className="cashier-sales-menu">
      <div className="cashier-sales-buttons">
        <div className="cashier-delete-button">
          <button>Delete Item</button>
        </div>
        <div className="cashier-checkout-button">
          <button>Checkout</button>
        </div>
        <div className="cashier-employee-name">
          {selectedEmployee ? (
            <p>
              {selectedEmployee.first_name} {selectedEmployee.last_name}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="cashier-options-button">
          <button>Options</button>
        </div>
      </div>
    </div>
  );
}

export default SalesMenu;
