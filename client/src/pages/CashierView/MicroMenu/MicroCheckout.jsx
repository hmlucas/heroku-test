import "../CashierView.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import "./MicroCheckout.css";
import useCashierStore from "../../../store/cashierStore";

const MicroCheckout = ({ changeMenu }) => {
  const { removeAllTickets } = useCashierStore();
  const selection = [
    { label: "Cash" },
    { label: "Credit" },
    { label: "Debit" },
    { label: "Student Card" },
  ];

  const handleCheckout = () => {
    // TODO: Implement checkout logic (e.g., sending order to the database)
    removeAllTickets();
    changeMenu(MenuEnum.NEW_ITEM);
  };

  const renderButtons = () =>
    selection.map((option) => (
      <button key={option.label} onClick={handleCheckout}>
        {option.label}
      </button>
    ));

  return <div className="cashier-micro-checkout">{renderButtons()}</div>;
};

MicroCheckout.propTypes = {
  changeMenu: PropTypes.func.isRequired,
};

export default MicroCheckout;
