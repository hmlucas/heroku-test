import "../CashierView.css";
import "./DynamicButtons.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";
import React from "react";
import ok from "../../../assets/cashierview/ui_menu_ok.mp3";

const MicroDrinks = ({ menuDrinks, changeMenu }) => {
  const okAudio = new Audio(ok);
  const {
    updateInProgress,
    selectTicket,
    addOptionToTicket,
    replaceOption,
    currentTicket,
  } = useCashierStore();

  const getGridClass = () => {
    const length = menuDrinks.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3";
  };
  const handleDrinkClick = (drink) => {
    okAudio.play();
    if (currentTicket.options.length > 0) {
      replaceOption(0, drink);
    } else {
      addOptionToTicket(drink);
    }
    changeMenu(MenuEnum.NEW_ITEM);
    updateInProgress(false);
    selectTicket(null);
  };
  const renderDrinks = () => {
    return menuDrinks?.length > 0 ? (
      <div className={`drinks-buttons ${getGridClass()}`}>
        {menuDrinks.map((drink, index) => (
          <button
            key={index}
            className="drink-button"
            onClick={() => handleDrinkClick(drink)}
            aria-label={`Select ${drink.option.replace(/_/g, " ")}`}
          >
            {drink.option.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    ) : (
      <p>No drinks available.</p>
    );
  };

  return <div className="cashier-micro-drinks">{renderDrinks()}</div>;
};

MicroDrinks.propTypes = {
  menuDrinks: PropTypes.array.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default MicroDrinks;
