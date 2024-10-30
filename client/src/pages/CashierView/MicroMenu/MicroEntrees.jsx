import "../CashierView.css"; // Original import
import "./DynamicButtons.css"; // New import for dynamic grid layout
import PropTypes from "prop-types";

const MicroEntrees = ({ menuEntrees }) => {
  const getGridClass = () => {
    const length = menuEntrees.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3"; // Default for 1-8 items
  };

  return (
    <div className="cashier-micro-entrees">
      {menuEntrees && menuEntrees.length > 0 ? (
        <div className={`entrees-buttons ${getGridClass()}`}>
          {menuEntrees.map((entree, index) => (
            <button key={index} className="entree-button">
              {entree.option.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      ) : (
        <p>No entrees available.</p>
      )}
    </div>
  );
};

MicroEntrees.propTypes = {
  menuEntrees: PropTypes.array.isRequired,
};

export default MicroEntrees;
