import "./CashierView.css";
import TicketStack from "./TicketStack";
import SalesMenu from "./SalesMenu";
import NavBar from "./NavBar";
import MicroMenu from "./MicroMenu";
import { useEffect, useState } from "react";
import MenuEnum from "./MenuEnum";
import useEmployeeStore from "../../store/useEmployeeStore";

const CashierView = () => {
  const { selectedEmployee, fetchEmployeeById } = useEmployeeStore();

  //Nav bar micromenu interaction
  const [activeMenu, setActiveMenu] = useState(MenuEnum.NEW_ITEM);
  const changeMenu = (index) => {
    setActiveMenu(index);
  };
  useEffect(() => {
    fetchEmployeeById(1); // fetch current active employee //TODO make this use current employee (remove the fetch?)
  }, [fetchEmployeeById]);

  return (
    <div className="cashier-view">
      <div className="cashier-left-panel">
        <TicketStack />
        <SalesMenu
          activeMenu={activeMenu}
          changeMenu={changeMenu}
          selectedEmployee={selectedEmployee}
        />
      </div>
      <div className="cashier-right-panel">
        <NavBar activeMenu={activeMenu} changeMenu={changeMenu} />
        <MicroMenu activeMenu={activeMenu} changeMenu={changeMenu} />
      </div>
    </div>
  );
};

export default CashierView;
