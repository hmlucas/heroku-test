import "../CashierView.css";
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

  return (
    <div className="cashier-micro-alacarte">
      {combinedOptions.length > 0 ? (
        <div className="alacarte-buttons">
          {combinedOptions.map((item, index) => (
            <button key={index} className="alacarte-button">
              {item.option.replace(/_/g, " ")}{" "}
              {/* Display the option, replacing underscores */}
            </button>
          ))}
        </div>
      ) : (
        <p>No items available.</p> // Fallback message if no items are fetched
      )}
    </div>
  );
};

MicroAlaCarte.propTypes = {
  menuEntrees: PropTypes.array.isRequired,
  menuSides: PropTypes.array.isRequired,
};

export default MicroAlaCarte;
