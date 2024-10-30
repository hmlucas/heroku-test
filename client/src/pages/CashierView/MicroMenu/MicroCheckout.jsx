import "../CashierView.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import "./MicroCheckout.css";

const MicroCheckout = ({ changeMenu }) => {
  const selection = [
    { label: "Cash" },
    { label: "Credit" },
    { label: "Debit" },
    { label: "Student Card" },
  ];

  //TODO Checkout and send current order to database
  const renderButtons = () =>
    selection.map((option) => (
      <button key={option.label} onClick={() => changeMenu(MenuEnum.NEW_ITEM)}>
        {option.label} {/* Display label directly */}
      </button>
    ));

  return <div className="cashier-micro-checkout">{renderButtons()}</div>;
};

MicroCheckout.propTypes = {
  changeMenu: PropTypes.func.isRequired,
};

export default MicroCheckout;
