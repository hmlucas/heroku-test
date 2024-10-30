import "../CashierView.css";
import PropTypes from "prop-types";

const MicroApps = ({ menuApps }) => {
  return (
    <div className="cashier-micro-apps">
      {menuApps && menuApps.length > 0 ? (
        <div className="apps-buttons">
          {menuApps.map((app, index) => (
            <button key={index} className="app-button">
              {app.option.replace(/_/g, " ")}{" "}
              {/* Display the option for each appetizer */}
            </button>
          ))}
        </div>
      ) : (
        <p>No appetizers available.</p> // Fallback message if no appetizers are fetched
      )}
    </div>
  );
};

MicroApps.propTypes = {
  menuApps: PropTypes.array.isRequired,
};

export default MicroApps;
