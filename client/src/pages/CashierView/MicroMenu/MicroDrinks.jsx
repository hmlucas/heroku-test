import "../CashierView.css";
import "./DynamicButtons.css";
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";

const MicroDrinks = ({ menuDrinks, changeMenu }) => {
  const { orderInProgress } = useCashierStore();

  const getGridClass = () => {
    const length = menuDrinks.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3";
  };

  const renderDrinks = () => {
    //TODO Update ticket!
    return menuDrinks?.length > 0 ? (
      <div className={`drinks-buttons ${getGridClass()}`}>
        {menuDrinks.map((drink, index) => (
          <button
            key={index}
            className="drink-button"
            onClick={() => {
              changeMenu(MenuEnum.NEW_ITEM);
              orderInProgress(false);
            }}
            aria-label={`Select ${drink.option.replace(/_/g, " ")}`}
          >
            {drink.option.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    ) : (
      <p>No drinks available.</p>
    );
  };

  return (
    <div className="cashier-micro-drinks">
      {renderDrinks()} {/* Call the render function here */}
    </div>
  );
};

MicroDrinks.propTypes = {
  menuDrinks: PropTypes.array.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default MicroDrinks;
