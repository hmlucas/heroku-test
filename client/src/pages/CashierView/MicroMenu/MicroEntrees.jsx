import "../CashierView.css";
import "./DynamicButtons.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";
import React from "react";

const MicroEntrees = ({ menuEntrees, changeMenu }) => {
  const {
    updateInProgress,
    selectTicket,
    addOptionToTicket,
    entreeCount,
    decrementEntreeCount,
    tickets,
    replaceOption,
    replaceEntree,
  } = useCashierStore();
  const getGridClass = () => {
    const length = menuEntrees.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3";
  };

  const handleEntreeClick = (entree) => {
    //addOptionToTicket(entree);
    replaceEntree(entree);
    if (entreeCount <= 1) {
      changeMenu(MenuEnum.NEW_ITEM);
      updateInProgress(false);
      selectTicket(null);
    }
    decrementEntreeCount();
  };

  const renderEntrees = () => {
    return menuEntrees?.length > 0 ? (
      <div className={`entrees-buttons ${getGridClass()}`}>
        {menuEntrees.map((entree, index) => (
          <button
            key={index}
            className="entree-button"
            onClick={() => handleEntreeClick(entree)}
            aria-label={`Select ${entree.option.replace(/_/g, " ")}`}
          >
            {entree.option.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    ) : (
      <p>No entrees available.</p>
    );
  };

  return <div className="cashier-micro-entrees">{renderEntrees()}</div>;
};

MicroEntrees.propTypes = {
  menuEntrees: PropTypes.array.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default MicroEntrees;
