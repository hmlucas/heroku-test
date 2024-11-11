import "../CashierView.css";
import "./DynamicButtons.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";
import React from "react";
import ok from "../../../assets/cashierview/ui_menu_ok.mp3";

const MicroSides = ({ menuSides, changeMenu }) => {
  const { currentTicket, addOptionToTicket, replaceOption } = useCashierStore();
  const okAudio = new Audio(ok);
  const getGridClass = () => {
    const length = menuSides.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3";
  };

  const handleSideClick = (side) => {
    okAudio.play();
    if (currentTicket.options.length > 0) {
      replaceOption(0, side);
    } else {
      addOptionToTicket(side);
    }
    changeMenu(MenuEnum.ENTREES);
  };

  const renderSides = () => {
    if (menuSides?.length > 0) {
      return (
        //TODO Update ticket
        <div className={`sides-buttons ${getGridClass()}`}>
          {menuSides.map((side, index) => (
            <button
              key={index}
              className="side-button"
              onClick={() => handleSideClick(side)}
            >
              {side.option.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      );
    }
    return <p>No sides available.</p>;
  };

  return <div className="cashier-micro-sides">{renderSides()}</div>;
};

MicroSides.propTypes = {
  menuSides: PropTypes.array.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default MicroSides;
