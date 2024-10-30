import "../CashierView.css";
import PropTypes from "prop-types";

const MicroEntrees = ({ menuEntrees }) => {
  return (
    <div className="cashier-micro-entrees">
      {menuEntrees && menuEntrees.length > 0 ? (
        <div className="entrees-buttons">
          {menuEntrees.map((entree, index) => (
            <button key={index} className="entree-button">
              {entree.option.replace(/_/g, " ")}{" "}
              {/* Display the option for each entree */}
            </button>
          ))}
        </div>
      ) : (
        <p>No entrees available.</p> // Fallback message if no entrees are fetched
      )}
    </div>
  );
};

MicroEntrees.propTypes = {
  menuEntrees: PropTypes.array.isRequired,
};

export default MicroEntrees;
