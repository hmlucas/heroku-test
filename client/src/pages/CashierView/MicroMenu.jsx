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

const MicroMenu = ({
  activeMenu,
  changeMenu,
  menuSides,
  menuDrinks,
  menuEntrees,
  menuApps,
}) => {
  const renderMenu = () => {
    switch (activeMenu) {
      case MenuEnum.NEW_ITEM:
        return <MicroNewItem changeMenu={changeMenu} />;
      case MenuEnum.ENTREES:
        return (
          <MicroEntrees menuEntrees={menuEntrees} changeMenu={changeMenu} />
        );
      case MenuEnum.SIDES:
        return <MicroSides menuSides={menuSides} changeMenu={changeMenu} />;
      case MenuEnum.DRINKS:
        return <MicroDrinks menuDrinks={menuDrinks} changeMenu={changeMenu} />;
      case MenuEnum.APPETIZERS:
        return <MicroAppetizers menuApps={menuApps} changeMenu={changeMenu} />;
      case MenuEnum.A_LA_CARTE:
        return (
          <MicroALaCarte
            menuEntrees={menuEntrees}
            menuSides={menuSides}
            changeMenu={changeMenu}
          />
        );
      case MenuEnum.CHECKOUT:
        return <MicroCheckout changeMenu={changeMenu} />;
      case MenuEnum.OPTIONS:
        return <MicroOptions changeMenu={changeMenu} />;
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
  activeMenu: PropTypes.number.isRequired, // activeMenu should be a required number
  changeMenu: PropTypes.func.isRequired,
  menuSides: PropTypes.array.isRequired,
  menuEntrees: PropTypes.array.isRequired,
  menuApps: PropTypes.array.isRequired,
  menuDrinks: PropTypes.array.isRequired,
};

export default MicroMenu;
