import "../CashierView.css";
import "./MicroOptions.css";
import MenuEnum from "../MenuEnum";
import useCashierStore from "../../../store/cashierStore";
import PropTypes from "prop-types";
import clearOrder from "../../../assets/cashierview/cancel.mp3";
import React from "react";
import ok from "../../../assets/cashierview/ui_menu_ok.mp3";

const MicroOptions = ({ changeMenu }) => {
  const selection = [{ label: "Clear Order" }, { label: "Logout" }];
  const { removeAllTickets } = useCashierStore();
  const clearOrderAudio = new Audio(clearOrder);
  const okAudio = new Audio(ok);
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
            okAudio.play();
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
