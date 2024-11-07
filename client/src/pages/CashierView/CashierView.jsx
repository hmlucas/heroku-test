import "./CashierView.css";
import TicketStack from "./TicketStack";
import SalesMenu from "./SalesMenu";
import NavBar from "./NavBar";
import MicroMenu from "./MicroMenu";
import { useEffect, useState } from "react";
import MenuEnum from "./MenuEnum";
import useEmployeeStore from "../../store/useEmployeeStore";
import menuOptionsStore from "../../store/menuOptionsStore";
import useCashierStore from "../../store/cashierStore";

const CashierView = () => {
  const { setCurrentMicroMenu, currentTicket, maxEntreeCount, setEntreeCount } =
    useCashierStore();
  const { selectedEmployeeID, selectedEmployee, fetchEmployeeById } =
    useEmployeeStore();
  const {
    fetchEntrees,
    fetchApps,
    fetchSides,
    fetchDrinks,
    menuSides,
    menuEntrees,
    menuDrinks,
    menuApps,
    isLoading,
    error,
  } = menuOptionsStore();

  const [activeMenu, setActiveMenu] = useState(MenuEnum.NEW_ITEM);
  const [tickets, setTickets] = useState([]);

  const changeMenu = (index) => {
    if (index === MenuEnum.ENTREES) {
      setEntreeCount(maxEntreeCount);
    }
    setCurrentMicroMenu(index);
    setActiveMenu(index);
  };

  const addTicket = (newTicket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]);
  };

  const removeAllTickets = () => {
    setTickets([]);
  };
  //TODO REMOVE Adn replace with functioning ticket stack
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchEmployeeById(selectedEmployeeID),
          fetchSides(),
          fetchEntrees(),
          fetchApps(),
          fetchDrinks(),
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [
    selectedEmployeeID,
    fetchEmployeeById,
    fetchSides,
    fetchEntrees,
    fetchApps,
    fetchDrinks,
  ]);

  useEffect(() => {
    console.log("Retrieved menuSides:", menuSides);
  }, [menuSides]);

  return (
    <div className="cashier-view">
      <div className="cashier-left-panel">
        <TicketStack changeMenu={changeMenu} />
        <SalesMenu
          activeMenu={activeMenu}
          changeMenu={changeMenu}
          selectedEmployee={selectedEmployee}
        />
      </div>
      <div className="cashier-right-panel">
        <NavBar activeMenu={activeMenu} changeMenu={changeMenu} />
        <MicroMenu
          activeMenu={activeMenu}
          changeMenu={changeMenu}
          menuSides={menuSides}
          menuDrinks={menuDrinks}
          menuEntrees={menuEntrees}
          menuApps={menuApps}
          addTicket={addTicket}
          removeAllTickets={removeAllTickets}
        />
      </div>
    </div>
  );
};

export default CashierView;
