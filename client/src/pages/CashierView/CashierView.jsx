import "./CashierView.css";
import TicketStack from "./TicketStack";
import SalesMenu from "./SalesMenu";
import NavBar from "./NavBar";
import MicroMenu from "./MicroMenu";
import { useState } from "react";
import MenuEnum from "./MenuEnum";

const CashierView = () => {
  //Nav bar micromenu interaction
  const [activeMenu, setActiveMenu] = useState(MenuEnum.NEW_ITEM);
  const changeMenu = (index) => {
    setActiveMenu(index);
  };

  return (
    <div className="cashier-view">
      <div className="cashier-left-panel">
        <TicketStack />
        <SalesMenu activeMenu={activeMenu} changeMenu={changeMenu} />
      </div>
      <div className="cashier-right-panel">
        <NavBar activeMenu={activeMenu} changeMenu={changeMenu} />
        <MicroMenu activeMenu={activeMenu} />
      </div>
    </div>
  );
};

export default CashierView;
