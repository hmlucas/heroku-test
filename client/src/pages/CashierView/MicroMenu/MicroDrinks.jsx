import "../CashierView.css";
import PropTypes from "prop-types";

const MicroDrinks = ({ menuDrinks }) => {
  return (
    <div className="cashier-micro-drinks">
      {menuDrinks && menuDrinks.length > 0 ? (
        <div className="drinks-buttons">
          {menuDrinks.map((drink, index) => (
            <button key={index} className="drink-button">
              {drink.option.replace(/_/g, " ")}{" "}
              {/* Display the option for each drink */}
            </button>
          ))}
        </div>
      ) : (
        <p>No drinks available.</p> // Fallback message if no drinks are fetched
      )}
    </div>
  );
};

MicroDrinks.propTypes = {
  menuDrinks: PropTypes.array.isRequired,
};

export default MicroDrinks;
