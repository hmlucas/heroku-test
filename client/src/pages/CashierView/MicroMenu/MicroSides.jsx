import "../CashierView.css";
import PropTypes from "prop-types";

const MicroSides = ({ menuSides }) => {
  return (
    <div className="cashier-micro-sides">
      {menuSides && menuSides.length > 0 ? (
        <div className="sides-buttons">
          {menuSides.map((side, index) => (
            <button key={index} className="side-button">
              {side.option.replace(/_/g, " ")}{" "}
              {/* Display the option for each side */}
            </button>
          ))}
        </div>
      ) : (
        <p>No sides available.</p> // Fallback message if no sides are fetched
      )}
    </div>
  );
};

MicroSides.propTypes = {
  menuSides: PropTypes.array.isRequired,
};

export default MicroSides;
