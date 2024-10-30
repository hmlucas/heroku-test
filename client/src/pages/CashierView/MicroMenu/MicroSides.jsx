import "../CashierView.css";
import "./DynamicButtons.css";
import PropTypes from "prop-types";

const MicroSides = ({ menuSides }) => {
  // Determine the appropriate class based on the number of sides
  const getGridClass = () => {
    const length = menuSides.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3"; // Default for 1-8 items
  };

  return (
    <div className="cashier-micro-sides">
      {menuSides && menuSides.length > 0 ? (
        <div className={`sides-buttons ${getGridClass()}`}>
          {menuSides.map((side, index) => (
            <button key={index} className="side-button">
              {side.option.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      ) : (
        <p>No sides available.</p>
      )}
    </div>
  );
};

MicroSides.propTypes = {
  menuSides: PropTypes.array.isRequired,
};

export default MicroSides;
