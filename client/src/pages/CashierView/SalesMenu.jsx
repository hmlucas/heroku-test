import "./CashierView.css";
import "./SalesMenu.css";
import { useEffect, useState } from "react";
import useEmployeeStore from "../../store/useEmployeeStore";
// import axios from "axios";

function SalesMenu() {
  const { selectedEmployee, fetchEmployeeById } = useEmployeeStore();
  // const [imageName, setImageName] = useState("./src/img/placeholder.gif");

  const [hasIncompleteOrder, setHasIncompleteOrder] = useState(false);
  const [hasTickets, setHasTickets] = useState(false);
  const [hasSelectedOrder, setHasSelectedOrder] = useState(false);

  useEffect(() => {
    fetchEmployeeById(1); // fetch current active employee //TODO make this use current employee (remove the fetch?)

    //TODO placeholder states - should update based on current order state
    setHasTickets(true);
    setHasSelectedOrder(true);
    setHasIncompleteOrder(false);
  }, [fetchEmployeeById]);

  // TODO Add click functionality
  const optionsAction = () => {
    alert("FIXME Options Clicked!");
  };
  const deleteAction = () => {
    alert("FIXME Delete Clicked!");
  };
  const checkoutAction = () => {
    alert("FIXME Checkout Clicked!");
  };
  /*
  Sales Menu States: 
    - Incomplete order (edit or new one) - no checkout button
    - No tickets - no delete no checkout
    - No selected order (recent deletion) - no delete
*/
  return (
    <div className="cashier-sales-menu">
      <div className="cashier-sales-buttons">
        <div className="cashier-delete-button">
          <button
            onClick={deleteAction}
            disabled={!hasTickets || !hasSelectedOrder}
          >
            Delete Item
          </button>
        </div>
        <div className="cashier-checkout-button">
          <button
            onClick={checkoutAction}
            disabled={!hasTickets || hasIncompleteOrder}
          >
            Checkout
          </button>
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
          <button onClick={optionsAction}>
            <img
              src="./src/img/placeholder.gif"
              alt="Options"
              className="cashier-options-image"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalesMenu;
