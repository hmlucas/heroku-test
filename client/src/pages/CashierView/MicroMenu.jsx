import { useState } from "react";
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

const MicroMenu = () => {
  const [activeMenu, setActiveMenu] = useState(MenuEnum.NEW_ITEM);
  const changeMenu = (index) => {
    if (index in MenuEnum) {
      setActiveMenu(index); // Update the state with the selected component
    }
  };

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
      <h1>MicroMenu=</h1>
      <div className="menu-display">
        {renderMenu()} {/* Render the selected menu */}
      </div>
    </div>
  );
};

export default MicroMenu;
