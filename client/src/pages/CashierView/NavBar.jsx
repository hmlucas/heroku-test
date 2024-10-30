import "./CashierView.css";
import "./NavBar.css";
import PropTypes from "prop-types";
import MenuEnum from "./MenuEnum";

const NavBar = ({ activeMenu, changeMenu }) => {
  const menuOptions = [
    { label: "New Item", value: MenuEnum.NEW_ITEM },
    { label: "Sides", value: MenuEnum.SIDES },
    { label: "Entrees", value: MenuEnum.ENTREES },
    { label: "Drinks", value: MenuEnum.DRINKS },
    { label: "Appetizers", value: MenuEnum.APPETIZERS },
    { label: "A La Carte", value: MenuEnum.A_LA_CARTE },
    { label: "Checkout", value: MenuEnum.CHECKOUT },
  ];

  // insanity but just render buttons for active button
  const renderButtons = () =>
    menuOptions.map((option) => (
      <button
        key={option.value} // ensure each button has a unique key
        className={activeMenu === option.value ? "selected" : ""}
        onClick={() => changeMenu(option.value)}
      >
        {option.label}
      </button>
    ));

  return <div className="cashier-nav-bar">{renderButtons()}</div>;
};

//required functions
NavBar.propTypes = {
  activeMenu: PropTypes.number.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default NavBar;
