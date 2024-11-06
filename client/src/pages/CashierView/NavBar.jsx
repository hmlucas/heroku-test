import "./CashierView.css";
import "./NavBar.css";
import PropTypes from "prop-types";
import MenuEnum from "./MenuEnum";
import useCashierStore from "../../store/cashierStore";

const NavBar = ({ activeMenu, changeMenu }) => {
  const { currentTicket, orderInProgress, emptyTickets } = useCashierStore();
  const menuOptions = [
    { label: "New Item", value: MenuEnum.NEW_ITEM },
    { label: "Sides", value: MenuEnum.SIDES },
    { label: "Entrees", value: MenuEnum.ENTREES },
    { label: "Drinks", value: MenuEnum.DRINKS },
    { label: "Appetizers", value: MenuEnum.APPETIZERS },
    { label: "A La Carte", value: MenuEnum.A_LA_CARTE },
    { label: "Checkout", value: MenuEnum.CHECKOUT },
  ];

  const disableState = (optionValue) => {
    if (optionValue === MenuEnum.CHECKOUT) {
      return emptyTickets || orderInProgress;
    }
    if (optionValue === MenuEnum.NEW_ITEM) {
      return orderInProgress;
    }
    if (!currentTicket) return true; // disable the others

    switch (currentTicket.meal_type) {
      case "Bowl":
      case "Plate":
      case "Bigger Plate":
        if (
          optionValue === MenuEnum.SIDES ||
          (optionValue === MenuEnum.ENTREES &&
            currentTicket.options &&
            currentTicket.options.length > 0)
        ) {
          return false;
        }
        break;
      case "Drink":
        if (optionValue === MenuEnum.DRINKS) {
          return false;
        }
        break;
      case "Appetizer":
        if (optionValue === MenuEnum.APPETIZERS) {
          return false;
        }
        break;
      case "A La Carte":
        if (optionValue === MenuEnum.A_LA_CARTE) {
          return false;
        }
        break;
      default:
        return true;
    }

    return true;
  };
  // insanity but just render buttons for active button
  const renderButtons = () =>
    menuOptions.map((option) => {
      const isDisabled = disableState(option.value);
      return (
        <button
          key={option.value} // Ensure each button has a unique key
          className={activeMenu === option.value ? "selected" : ""}
          onClick={() => changeMenu(option.value)}
          disabled={isDisabled}
        >
          {option.label}
        </button>
      );
    });

  return <div className="cashier-nav-bar">{renderButtons()}</div>;
};

//required functions
NavBar.propTypes = {
  activeMenu: PropTypes.number.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default NavBar;
