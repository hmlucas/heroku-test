import "../CashierView.css";
import "./DynamicButtons.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";
import React from "react";
import ok from "../../../assets/cashierview/ui_menu_ok.mp3";

const MicroApps = ({ menuApps, changeMenu }) => {
  const okAudio = new Audio(ok);
  const {
    updateInProgress,
    selectTicket,
    addOptionToTicket,
    replaceOption,
    currentTicket,
  } = useCashierStore();
  const getGridClass = () => {
    const length = menuApps.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3";
  };
  const handleAppClick = (app) => {
    okAudio.play();
    if (currentTicket.options.length > 0) {
      replaceOption(0, app);
    } else {
      addOptionToTicket(app);
    }
    changeMenu(MenuEnum.NEW_ITEM);
    updateInProgress(false);
    selectTicket(null);
  };
  const renderApps = () => {
    //TODO UPDATE TICKETS
    return menuApps?.length > 0 ? (
      <div className={`apps-buttons ${getGridClass()}`}>
        {menuApps.map((app, index) => (
          <button
            key={index}
            className="app-button"
            onClick={() => handleAppClick(app)}
            aria-label={`Select ${app.option.replace(/_/g, " ")}`}
          >
            {app.option.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    ) : (
      <p>No appetizers available.</p>
    );
  };

  return <div className="cashier-micro-apps">{renderApps()}</div>;
};

MicroApps.propTypes = {
  menuApps: PropTypes.array.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default MicroApps;
