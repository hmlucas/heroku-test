import "./CashierView.css";
import "./SalesMenu.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MenuEnum from "./MenuEnum";
import { Options as OptionImage } from "../Images"; //TODO update image

const SalesMenu = ({ activeMenu, changeMenu, selectedEmployee }) => {
  //import states
  //TODO not sure if this needs to change where it imports
  const [hasIncompleteOrder, setHasIncompleteOrder] = useState(false);
  const [hasTickets, setHasTickets] = useState(false);
  const [hasSelectedOrder, setHasSelectedOrder] = useState(false);

  useEffect(() => {
    //TODO placeholder states - should update based on current order state
    /*
    Sales Menu States: 
      - Incomplete order (edit or new one) - no checkout button
      - No tickets - no delete no checkout
      - No selected order (recent deletion) - no delete
    */
    setHasTickets(true);
    setHasSelectedOrder(true);
    setHasIncompleteOrder(false);
  });

  // TODO Add click functionality
  const optionsAction = () => {
    changeMenu(MenuEnum.OPTIONS);
  };
  const deleteAction = () => {
    alert("FIXME Delete Clicked!");
  };
  const checkoutAction = () => {
    changeMenu(MenuEnum.CHECKOUT);
  };

  const checkoutButton = activeMenu === MenuEnum.CHECKOUT ? "selected" : "";
  const optionsButton = activeMenu === MenuEnum.OPTIONS ? "selected" : "";
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
            className={checkoutButton}
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
          <button onClick={optionsAction} className={optionsButton}>
            <img
              src={OptionImage}
              alt="Options"
              className="cashier-options-image"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
SalesMenu.propTypes = {
  changeMenu: PropTypes.func.isRequired,
  activeMenu: PropTypes.number.isRequired,
  selectedEmployee: PropTypes.func.isRequired,
};
export default SalesMenu;
