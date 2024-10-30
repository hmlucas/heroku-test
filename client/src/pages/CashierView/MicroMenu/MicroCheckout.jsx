import "../CashierView.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import "./MicroCheckout.css";

const MicroCheckout = ({ changeMenu, removeAllTickets }) => {
  const selection = [
    { label: "Cash" },
    { label: "Credit" },
    { label: "Debit" },
    { label: "Student Card" },
  ];

  const handleCheckout = () => {
    // TODO: Implement checkout logic (e.g., sending order to the database)
    removeAllTickets(); // Call to remove all tickets on checkout
    changeMenu(MenuEnum.NEW_ITEM); // Navigate back to new item menu
  };

  const renderButtons = () =>
    selection.map((option) => (
      <button key={option.label} onClick={handleCheckout}>
        {option.label} {/* Display label directly */}
      </button>
    ));

  return <div className="cashier-micro-checkout">{renderButtons()}</div>;
};

MicroCheckout.propTypes = {
  changeMenu: PropTypes.func.isRequired,
};

export default MicroCheckout;
