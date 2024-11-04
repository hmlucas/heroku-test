import "../CashierView.css";
import "./DynamicButtons.css"; // Updated import to match the new naming convention
import PropTypes from "prop-types";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";

const MicroAlaCarte = ({ menuEntrees, menuSides, changeMenu }) => {
  const { updateInProgress, selectTicket } = useCashierStore();
  const filteredEntrees = menuEntrees.filter(
    (entree) => !entree.option.includes("1/2")
  );
  const filteredSides = menuSides.filter(
    (side) => !side.option.includes("1/2")
  );

  const combinedOptions = [...filteredEntrees, ...filteredSides];

  const getGridClass = () => {
    const length = combinedOptions.length;
    if (length >= 26) return "grid-6x6";
    if (length >= 17) return "grid-5x5";
    if (length >= 9) return "grid-4x4";
    return "grid-3x3";
  };

  const renderOptions = () =>
    //TODO UPDATE TICKET TRACK AMOUNT AND CLEAR SELECTION
    combinedOptions.length > 0 ? (
      <div className={`alacarte-buttons ${getGridClass()}`}>
        {combinedOptions.map((item, index) => (
          <button key={index} className="alacarte-button">
            {item.option.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    ) : (
      <p>No items available.</p>
    );

  return (
    <div className="cashier-micro-alacarte">
      {renderOptions()}
      <button
        className="continue-button"
        onClick={() => {
          changeMenu(MenuEnum.NEW_ITEM);
          updateInProgress(false);
          selectTicket(null);
        }}
      >
        Continue
      </button>
    </div>
  );
};

MicroAlaCarte.propTypes = {
  menuEntrees: PropTypes.array.isRequired,
  menuSides: PropTypes.array.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default MicroAlaCarte;
