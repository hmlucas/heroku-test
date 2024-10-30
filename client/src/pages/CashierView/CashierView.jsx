import "./CashierView.css";
import TicketStack from "./TicketStack";
import SalesMenu from "./SalesMenu";
import NavBar from "./NavBar";
import MicroMenu from "./MicroMenu";
import { useEffect, useState } from "react";
import MenuEnum from "./MenuEnum";
import useEmployeeStore from "../../store/useEmployeeStore";
import menuOptionsStore from "../../store/menuOptionsStore";

const CashierView = () => {
  const { selectedEmployee, fetchEmployeeById } = useEmployeeStore();
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

  //Nav bar micromenu interaction
  const [activeMenu, setActiveMenu] = useState(MenuEnum.NEW_ITEM);
  const changeMenu = (index) => {
    setActiveMenu(index);
  };
  //TODO REMOVE Adn replace with functioning ticket stack
  const demoTickets = [
    {
      id: 1,
      orderType: "Bowl",
      options: {
        entrees: ["Orange Chicken", "Beijing Beef"],
        sides: ["Fried Rice"],
      },
      price: 15.99,
    },
    {
      id: 2,
      orderType: "Plate",
      options: {
        entrees: ["Kung Pao Chicken"],
        sides: ["Chow Mein", "Egg Roll"],
      },
      price: 12.5,
    },
    {
      id: 3,
      orderType: "Drink",
      options: { drinks: ["Peach Iced Tea", "Lemonade"] },
      price: 2.5,
    },
    {
      id: 4,
      orderType: "Appetizer",
      options: { apps: ["Spring Rolls", "Crab Rangoon"] },
      price: 7.25,
    },
    {
      id: 5,
      orderType: "A La Carte",
      options: { entrees: ["Broccoli Beef"], sides: ["White Rice"] },
      price: 8.99,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchEmployeeById(1),
          fetchSides(),
          fetchEntrees(),
          fetchApps(),
          fetchDrinks(),
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
        // Optionally set an error state here if needed
      }
    };

    fetchData();
  }, [fetchEmployeeById, fetchSides, fetchEntrees, fetchApps, fetchDrinks]);

  useEffect(() => {
    console.log("Retrieved menuSides:", menuSides);
  }, [menuSides]);

  return (
    <div className="cashier-view">
      <div className="cashier-left-panel">
        <TicketStack tickets={demoTickets} />
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
        />
      </div>
    </div>
  );
};

export default CashierView;
