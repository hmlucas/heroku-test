import "../CashierView.css";
import MenuEnum from "../MenuEnum.js";
import PropTypes from "prop-types";
import "./2x3.css";

const MicroNewItem = ({ changeMenu }) => {
  const selection = [
    { label: "Bowl", nav: MenuEnum.SIDES, selectCount: 1, className: "bowl" },
    { label: "Plate", nav: MenuEnum.SIDES, selectCount: 2, className: "plate" },
    {
      label: "Bigger Plate",
      nav: MenuEnum.SIDES,
      selectCount: 3,
      className: "bigger-plate",
    },
    { label: "Appetizer", nav: MenuEnum.APPETIZERS },
    { label: "A La Carte", nav: MenuEnum.A_LA_CARTE },
    { label: "Drink", nav: MenuEnum.DRINKS },
  ];

  const renderButtons = () =>
    selection.map((option) => (
      <button
        key={option.label} // ensure each button has a unique key
        onClick={() => changeMenu(option.nav)}
      >
        {option.label}
        {(option.label === "Bowl" ||
          option.label === "Plate" ||
          option.label === "Bigger Plate") &&
          option.selectCount > 0 && <span> </span>}
      </button>
    ));
  return <div className="cashier-micro-new-item">{renderButtons()}</div>;
};

MicroNewItem.propTypes = {
  changeMenu: PropTypes.func.isRequired,
};
export default MicroNewItem;
