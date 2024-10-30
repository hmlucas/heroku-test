import "../CashierView.css"; // Original import
import "./dynamicButtons.css"; // New import for dynamic grid layout
import PropTypes from "prop-types";

const MicroAlaCarte = ({ menuEntrees, menuSides }) => {
  // Filter out options with "1/2"
  const filteredEntrees = menuEntrees.filter(
    (entree) => !entree.option.includes("1/2")
  );
  const filteredSides = menuSides.filter(
    (side) => !side.option.includes("1/2")
  );

  // Combine filtered entrees and sides
  const combinedOptions = [...filteredEntrees, ...filteredSides];

  // Determine grid layout class based on number of items
  const getGridClass = () => {
    const length = combinedOptions.length;
    if (length >= 26) return "grid-6x6";
    if (length >= 17) return "grid-5x5";
    if (length >= 9) return "grid-4x4";
    return "grid-3x3"; // Default for 1-8 items
  };

  return (
    <div className="cashier-micro-alacarte">
      {combinedOptions.length > 0 ? (
        <div className={`alacarte-buttons ${getGridClass()}`}>
          {combinedOptions.map((item, index) => (
            <button key={index} className="alacarte-button">
              {item.option.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      ) : (
        <p>No items available.</p>
      )}
    </div>
  );
};

MicroAlaCarte.propTypes = {
  menuEntrees: PropTypes.array.isRequired,
  menuSides: PropTypes.array.isRequired,
};

export default MicroAlaCarte;
