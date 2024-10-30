import "../CashierView.css";
import MenuEnum from "../MenuEnum.js";
import PropTypes from "prop-types";
import "./MicroNewItem.css";

const MicroNewItem = ({ changeMenu, addTicket }) => {
  const selection = [
    //TODO CHANGE manual pricing
    {
      label: "Bowl",
      nav: MenuEnum.SIDES,
      selectCount: 1,
      className: "bowl",
      price: 8.5,
    },
    {
      label: "Plate",
      nav: MenuEnum.SIDES,
      selectCount: 2,
      className: "plate",
      price: 9.8,
    },
    {
      label: "Bigger Plate",
      nav: MenuEnum.SIDES,
      selectCount: 3,
      className: "bigger-plate",
      price: 11.3,
    },
    { label: "Drink", nav: MenuEnum.DRINKS, price: 0 },
    { label: "Appetizer", nav: MenuEnum.APPETIZERS, price: 0 },
    { label: "A La Carte", nav: MenuEnum.A_LA_CARTE, price: 0 },
  ];

  const handleButtonClick = (orderType, nav, price) => {
    // Create a new ticket with default values
    const newTicket = {
      id: Date.now(), // Use timestamp as a unique ID
      orderType,
      options: {
        entrees: ["Orange Chicken"],
        sides: [],
        drinks: [],
        apps: [],
      },
      price: price, // Default price can be set here
    };

    addTicket(newTicket); // Call the function to add a new ticket
    changeMenu(nav); // Change the menu after adding the ticket
  };
  const renderButtons = () =>
    selection.map((option) => (
      <button
        key={option.label} // ensure each button has a unique key
        onClick={() =>
          handleButtonClick(option.label, option.nav, option.price)
        }
      >
        {option.label}
        {(option.label === "Bowl" ||
          option.label === "Plate" ||
          option.label === "Bigger Plate") &&
          option.selectCount > 0 && <span> </span>}
      </button>
    ));
  return <div className="cashier-micro-new-item">{renderButtons()}</div>;
};

MicroNewItem.propTypes = {
  changeMenu: PropTypes.func.isRequired,
};
export default MicroNewItem;
