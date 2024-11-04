import "../CashierView.css";
import "./DynamicButtons.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";

const MicroApps = ({ menuApps, changeMenu }) => {
  const { updateInProgress, selectTicket } = useCashierStore();
  const getGridClass = () => {
    const length = menuApps.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3";
  };

  const renderApps = () => {
    //TODO UPDATE TICKETS
    return menuApps?.length > 0 ? (
      <div className={`apps-buttons ${getGridClass()}`}>
        {menuApps.map((app, index) => (
          <button
            key={index}
            className="app-button"
            onClick={() => {
              changeMenu(MenuEnum.NEW_ITEM);
              updateInProgress(false);
              selectTicket(null);
            }}
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

  return (
    <div className="cashier-micro-apps">
      {renderApps()} {/* Call the render function here */}
    </div>
  );
};

MicroApps.propTypes = {
  menuApps: PropTypes.array.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default MicroApps;
