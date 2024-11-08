import "../CashierView.css";
import MenuEnum from "../MenuEnum.js";
import PropTypes from "prop-types";
import "./MicroNewItem.css";
import useCashierStore from "../../../store/cashierStore";
import React from "react";
import ok from "../../../assets/cashierview/ui_general_focus.mp3";

const MicroNewItem = ({ changeMenu }) => {
  const { addNewTicket, setMaxEntreeCount } = useCashierStore();
  const okAudio = new Audio(ok);
  const selection = [
    //TODO CHANGE manual pricing
    {
      label: "Bowl",
      nav: MenuEnum.SIDES,
      selectCount: 1,
      className: "bowl",
      price: 8.5,
    },
    {
      label: "Plate",
      nav: MenuEnum.SIDES,
      selectCount: 2,
      className: "plate",
      price: 9.8,
    },
    {
      label: "Bigger Plate",
      nav: MenuEnum.SIDES,
      selectCount: 3,
      className: "bigger-plate",
      price: 11.3,
    },
    { label: "Drink", nav: MenuEnum.DRINKS, price: 0, selectCount: 0 },
    { label: "Appetizer", nav: MenuEnum.APPETIZERS, price: 2, selectCount: 0 },
    { label: "A La Carte", nav: MenuEnum.A_LA_CARTE, price: 0, selectCount: 0 },
  ];

  const handleButtonClick = (mealType, nav, price, selectCount = 0) => {
    okAudio.play();
    const newTicket = {
      ticket_id: Date.now(),
      menuitem_price: price,
      meal_type: mealType,
      premium_multiplier: 1,
      total_menuitem_price: price,
      options: [],
    };
    if (selectCount > 0) {
      setMaxEntreeCount(selectCount);
    }
    addNewTicket(newTicket);
    changeMenu(nav);
  };
  const renderButtons = () =>
    selection.map((option) => (
      <button
        key={option.label} // ensure each button has a unique key
        onClick={() =>
          handleButtonClick(
            option.label,
            option.nav,
            option.price,
            option.selectCount
          )
        }
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
