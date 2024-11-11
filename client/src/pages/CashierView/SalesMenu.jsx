import "./CashierView.css";
import "./SalesMenu.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MenuEnum from "./MenuEnum";
import gearIcon from "../../assets/gear-svgrepo-com.svg";
import useCashierStore from "../../store/cashierStore";
import cancel from "../../assets/cashierview/ui_menu_cancel.mp3";
import select from "../../assets/cashierview/ui_general_focus.mp3";

const SalesMenu = ({ activeMenu, changeMenu, selectedEmployee }) => {
  //import states
  const { emptyTickets, orderInProgress, currentTicket, removeTicket } =
    useCashierStore();
  const selectAudio = new Audio(select);
  const cancelAudio = new Audio(cancel);
  const [hasIncompleteOrder, setHasIncompleteOrder] = useState(false);
  const [hasTickets, setHasTickets] = useState(false);
  const [hasSelectedOrder, setHasSelectedOrder] = useState(false);

  useEffect(() => {
    /*
    Sales Menu States: 
      - Incomplete order (edit or new one) - no checkout button
      - No tickets - no delete no checkout
      - No selected order (recent deletion) - no delete
    */
    setHasTickets(!emptyTickets);
    setHasSelectedOrder(currentTicket !== null);
    setHasIncompleteOrder(orderInProgress);
  }, [emptyTickets, currentTicket, orderInProgress]);

  const optionsAction = () => {
    selectAudio.play();
    changeMenu(MenuEnum.OPTIONS);
  };
  const deleteAction = () => {
    cancelAudio.play();
    removeTicket();
    changeMenu(MenuEnum.NEW_ITEM);
  };
  const checkoutAction = () => {
    selectAudio.play();
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
            <p>Guest</p>
          )}
        </div>
        <div className="cashier-options-button">
          <button onClick={optionsAction} className={optionsButton}>
            <img
              src={gearIcon}
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
