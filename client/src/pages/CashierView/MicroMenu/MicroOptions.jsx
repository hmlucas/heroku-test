import "../CashierView.css";
import "./MicroOptions.css";

const MicroOptions = () => {
  const selection = [{ label: "Clear Order" }, { label: "Logout" }];

  const renderButtons = () =>
    selection.map((option) => (
      <button
        key={option.label}
        onClick={() => {
          if (option.label === "Clear Order") {
            alert("TODO Clear Order "); //TODO SEND A CLEAR ORDER!!!!
          } else if (option.label === "Logout") {
            window.location.href = "/";
          }
        }}
      >
        {option.label} {/* Display label directly */}
      </button>
    ));
  return (
    <div className="cashier-micro-options">
      <h1>{renderButtons()}</h1>
    </div>
  );
};

export default MicroOptions;
