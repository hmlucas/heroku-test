import "../CashierView.css"; // Original import
import "./dynamicButtons.css"; // New import for dynamic grid layout
import PropTypes from "prop-types";

const MicroDrinks = ({ menuDrinks }) => {
  const getGridClass = () => {
    const length = menuDrinks.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3"; // Default for 1-8 items
  };

  return (
    <div className="cashier-micro-drinks">
      {menuDrinks && menuDrinks.length > 0 ? (
        <div className={`drinks-buttons ${getGridClass()}`}>
          {menuDrinks.map((drink, index) => (
            <button key={index} className="drink-button">
              {drink.option.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      ) : (
        <p>No drinks available.</p>
      )}
    </div>
  );
};

MicroDrinks.propTypes = {
  menuDrinks: PropTypes.array.isRequired,
};

export default MicroDrinks;
