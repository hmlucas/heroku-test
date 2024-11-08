import "../CashierView.css";
import "./MicroOptions.css";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";
import PropTypes from "prop-types";
import clearOrder from "../../../assets/cashierview/cancel.mp3";
import React from "react";

const MicroOptions = ({ changeMenu }) => {
  const selection = [{ label: "Clear Order" }, { label: "Logout" }];
  const { removeAllTickets } = useCashierStore();
  const clearOrderAudio = new Audio(clearOrder);

  const renderButtons = () =>
    selection.map((option) => (
      <button
        key={option.label}
        onClick={() => {
          if (option.label === "Clear Order") {
            removeAllTickets();
            clearOrderAudio.play();
            changeMenu(MenuEnum.NEW_ITEM);
          } else if (option.label === "Logout") {
            window.location.href = "/cashier-login";
          }
        }}
      >
        {option.label}
      </button>
    ));
  return (
    <div className="cashier-micro-options">
      <h1>{renderButtons()}</h1>
    </div>
  );
};

MicroOptions.propTypes = {
  changeMenu: PropTypes.func.isRequired,
};

export default MicroOptions;
