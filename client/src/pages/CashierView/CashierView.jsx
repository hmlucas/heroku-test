import "./CashierView.css";
import TicketStack from "./TicketStack";
import SalesMenu from "./SalesMenu";
import NavBar from "./NavBar";
import MicroMenu from "./MicroMenu";

const CashierView = () => {
  return (
    <div className="cashier-view">
      <div className="cashier-left-panel">
        <TicketStack />
        <SalesMenu />
      </div>
      <div className="cashier-right-panel">
        <NavBar />
        <MicroMenu />
      </div>
    </div>
  );
};

export default CashierView;
