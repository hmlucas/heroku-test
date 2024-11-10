import "../CashierView.css";
import "./DynamicButtons.css";
import PropTypes from "prop-types";
import useCashierStore from "../../../store/cashierStore";
import "./ALaCarteMenus.css";
import React, { useState } from "react";
import MenuEnum from "../MenuEnum";
import ok from "../../../assets/cashierview/ui_menu_ok.mp3";
import focus from "../../../assets/cashierview/ui_general_focus.mp3";

const MicroAlaCarte = ({ menuEntrees, menuSides, changeMenu }) => {
  const okAudio = new Audio(ok);
  const focusAudio = new Audio(focus);
  const [currentSelectionScreen, setCurrentSelectionScreen] =
    useState("option");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const {
    addOptionToTicket,
    updateInProgress,
    selectTicket,
    currentTicket,
    replaceOption,
  } = useCashierStore();

  const filteredEntrees = menuEntrees.filter(
    (entree) => !entree.option.includes("1/2")
  );
  const filteredSides = menuSides.filter(
    (side) => !side.option.includes("1/2")
  );
  const prices = {
    //TODO database maybe
    side: {
      m: 4.4,
      l: 5.4,
    },
    entree: {
      s: 5.2,
      m: 8.5,
      l: 11.2,
    },
  };

  const handleAlaClick = (item) => {
    okAudio.play();
    const price = calculatePrice();

    const newCharge = item.additional_charge + price;

    const modifiedItem = { ...item, additional_charge: newCharge };
    if (currentTicket.options.length > 0) {
      replaceOption(0, modifiedItem);
    } else {
      addOptionToTicket(modifiedItem);
    }
    changeMenu(MenuEnum.NEW_ITEM);
    updateInProgress(false);
    selectTicket(null);
  };

  const sizeOptions = [
    { label: "Small", size: "s" },
    { label: "Medium", size: "m" },
    { label: "Large", size: "l" },
  ];

  const mealOptions = [
    { label: "Side", type: "side" },
    { label: "Entree", type: "entree" },
  ];

  const getGridClass = (items) => {
    const length = items.length;
    if (length >= 26) return "grid-6x6";
    if (length >= 17) return "grid-5x5";
    if (length >= 9) return "grid-4x4";
    return "grid-3x3";
  };
  const calculatePrice = () => {
    const selectedType = selectedOption;
    const selectedSizeValue = selectedSize?.size;

    if (selectedType && selectedSizeValue) {
      return prices[selectedType][selectedSizeValue];
    }

    return 0;
  };

  const loadAlaMenu = () => {
    switch (currentSelectionScreen) {
      case "option":
        return (
          <div className="alacarte-options-container">{renderOption()}</div>
        );
      case "size":
        return <div className="size-container">{renderSizes()}</div>;
      case "side":
        return <div>{renderSides(filteredSides)}</div>;
      case "entree":
        return <div>{renderEntrees(filteredEntrees)}</div>;
      default:
        return <div>Invalid Selection</div>;
    }
  };

  const renderOption = () => {
    const handleClick = (type) => {
      focusAudio.play();
      setSelectedOption(type);
      setCurrentSelectionScreen("size");
    };

    return (
      <div className="option-buttons">
        {mealOptions.map((option) => (
          <button
            key={option.type}
            className="alacarte-option-button"
            onClick={() => handleClick(option.type)}
            aria-label={`Select ${option.label}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  const renderSizes = () => {
    // Filter out "Small" size if the selected option is "side"
    const filteredSizeOptions =
      selectedOption === "side"
        ? sizeOptions.filter((option) => option.size !== "s")
        : sizeOptions;

    return filteredSizeOptions.map((sizeOption) => {
      const handleClick = () => {
        focusAudio.play();
        setSelectedSize(sizeOption); // Store selected size
        setCurrentSelectionScreen(selectedOption); // Go to either sides or entrees based on selected option
      };

      return (
        <button
          key={sizeOption.size}
          className="size-button"
          onClick={handleClick}
          aria-label={`Select ${sizeOption.label}`}
        >
          {sizeOption.label}
        </button>
      );
    });
  };

  const renderSides = () => {
    return filteredSides?.length > 0 ? (
      <div className={`sides-buttons ${getGridClass(filteredSides)}`}>
        {filteredSides.map((side, index) => (
          <button
            key={index}
            className="side-button"
            onClick={() => handleAlaClick(side)}
            aria-label={`Select ${side.option.replace(/_/g, " ")}`}
          >
            {side.option.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    ) : (
      <p>No sides available.</p>
    );
  };

  const renderEntrees = () => {
    return filteredEntrees?.length > 0 ? (
      <div className={`entrees-buttons ${getGridClass(filteredEntrees)}`}>
        {filteredEntrees.map((entree, index) => (
          <button
            key={index}
            className="entree-button"
            onClick={() => handleAlaClick(entree)}
            aria-label={`Select ${entree.option.replace(/_/g, " ")}`}
          >
            {entree.option.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    ) : (
      <p>No entrees available.</p>
    );
  };

  return <div className="cashier-micro-alacarte">{loadAlaMenu()}</div>;
};

MicroAlaCarte.propTypes = {
  menuEntrees: PropTypes.array.isRequired,
  menuSides: PropTypes.array.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

export default MicroAlaCarte;
