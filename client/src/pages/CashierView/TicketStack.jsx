import "./CashierView.css";
import useCashierStore from "../../store/cashierStore";

const TicketStack = () => {
  const { tickets } = useCashierStore();

  // Calculate total price of all tickets
  const total = tickets
    .reduce((acc, ticket) => acc + ticket.total_menuitem_price, 0)
    .toFixed(2);

  return (
    <div className="cashier-ticket-stack">
      <div className="ticket-list">
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.ticket_id}>
              <h4>
                {ticket.meal_type} ${ticket.total_menuitem_price.toFixed(2)}
              </h4>
              <ul>
                {Object.values(ticket.options)
                  .flat()
                  .map((item, index) => (
                    <li key={index}>{item.replace(/_/g, " ")}</li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {/* Total Panel at the bottom */}
      <div className="total-panel">
        <h3>Total: ${total}</h3>
      </div>
    </div>
  );
};

export default TicketStack;
