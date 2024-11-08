import "./CashierView.css";
import "./NavBar.css";
import PropTypes from "prop-types";
import MenuEnum from "./MenuEnum";
import useCashierStore from "../../store/cashierStore";
import select from "../../assets/cashierview/ui_general_focus.mp3";
import cancel from "../../assets/cashierview/ui_menu_cancel.mp3";

const NavBar = ({ activeMenu, changeMenu }) => {
  const selectAudio = new Audio(select);
  const cancelAudio = new Audio(cancel);
  const {
    currentTicket,
    orderInProgress,
    emptyTickets,
    removeTicket,
    addNewTicket,
  } = useCashierStore(); // Make sure removeTicket is part of the store
  const menuOptions = [
    { label: "New Item", value: MenuEnum.NEW_ITEM },
    { label: "Sides", value: MenuEnum.SIDES },
    { label: "Entrees", value: MenuEnum.ENTREES },
    { label: "Drink", value: MenuEnum.DRINKS, price: 0 },
    { label: "Appetizer", value: MenuEnum.APPETIZERS, price: 2 },
    { label: "A La Carte", value: MenuEnum.A_LA_CARTE, price: 0 },
    { label: "Checkout", value: MenuEnum.CHECKOUT },
  ];

  // disabled button logic
  const disableState = (optionValue) => {
    // checkout cases
    if (optionValue === MenuEnum.CHECKOUT) {
      return emptyTickets || orderInProgress;
    }
    // always show new_item
    if (optionValue === MenuEnum.NEW_ITEM) {
      return false;
    }

    // no sides or entrees if no ticket
    if (!currentTicket) {
      return optionValue === MenuEnum.SIDES || optionValue === MenuEnum.ENTREES;
    }

    //mapping button names to current meal type
    const mealTypeDisabledOptions = {
      Bowl: [MenuEnum.SIDES, MenuEnum.ENTREES],
      Plate: [MenuEnum.SIDES, MenuEnum.ENTREES],
      "Bigger Plate": [MenuEnum.SIDES, MenuEnum.ENTREES],
      Drink: [MenuEnum.DRINKS],
      Appetizer: [MenuEnum.APPETIZERS],
      "A La Carte": [MenuEnum.A_LA_CARTE],
    };

    if (
      mealTypeDisabledOptions[currentTicket.meal_type]?.includes(optionValue)
    ) {
      if (optionValue !== MenuEnum.ENTREES || currentTicket.options.length > 0)
        return false;
    }

    // disabled button otherwise if it doesnt match
    return true;
  };

  // button setup
  const renderButtons = () =>
    menuOptions.map((option) => {
      const isDisabled = disableState(option.value);
      const isSelected = activeMenu === option.value;

      const handleClick = () => {
        if (
          // remove the incomplete ticket if going back to new item menu
          option.value === MenuEnum.NEW_ITEM &&
          currentTicket &&
          orderInProgress
        ) {
          removeTicket();
          cancelAudio.play();
        } else {
          selectAudio.play();
        }
        // drink, app creates new item if clicked on
        if (
          option.price != null &&
          !orderInProgress &&
          currentTicket === null
        ) {
          const newTicket = {
            ticket_id: Date.now(),
            menuitem_price: option.price,
            meal_type: option.label,
            premium_multiplier: 1,
            total_menuitem_price: option.price,
            options: [],
          };
          addNewTicket(newTicket);
        }
        //otherwise change menu
        changeMenu(option.value);
      };

      return (
        <button
          key={option.value}
          className={isSelected ? "selected" : ""}
          onClick={handleClick}
          disabled={isDisabled}
        >
          {option.label}
        </button>
      );
    });

  return <div className="cashier-nav-bar">{renderButtons()}</div>;
};

// required functions
NavBar.propTypes = {
  activeMenu: PropTypes.number.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default NavBar;
