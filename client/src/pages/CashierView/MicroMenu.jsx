import "./CashierView.css";
import MicroNewItem from "./MicroMenu/MicroNewItem";
import MicroOptions from "./MicroMenu/MicroOptions";
import MicroSides from "./MicroMenu/MicroSides";
import MicroEntrees from "./MicroMenu/MicroEntrees";
import MicroDrinks from "./MicroMenu/MicroDrinks";
import MicroCheckout from "./MicroMenu/MicroCheckout";
import MicroAppetizers from "./MicroMenu/MicroAppetizers";
import MicroALaCarte from "./MicroMenu/MicroALaCarte";
import MenuEnum from "./MenuEnum";
import PropTypes from "prop-types";

const MicroMenu = ({ activeMenu }) => {
  const renderMenu = () => {
    switch (activeMenu) {
      case MenuEnum.NEW_ITEM:
        return <MicroNewItem />;
      case MenuEnum.ENTREES:
        return <MicroEntrees />;
      case MenuEnum.SIDES:
        return <MicroSides />;
      case MenuEnum.DRINKS:
        return <MicroDrinks />;
      case MenuEnum.APPETIZERS:
        return <MicroAppetizers />;
      case MenuEnum.A_LA_CARTE:
        return <MicroALaCarte />;
      case MenuEnum.CHECKOUT:
        return <MicroCheckout />;
      case MenuEnum.OPTIONS:
        return <MicroOptions />;
      default:
        return null;
    }
  };

  return (
    <div className="cashier-micro-menu">
      <div className="menu-display">
        {renderMenu()} {/* Render the selected menu */}
      </div>
    </div>
  );
};
MicroMenu.propTypes = {
  activeMenu: PropTypes.number.isRequired, // activeMenu should be a required string
};
export default MicroMenu;
