import "./CashierView.css";

const TicketStack = ({ tickets }) => {
  // Calculate total price of all tickets
  const total = tickets
    .reduce((acc, ticket) => acc + ticket.price, 0)
    .toFixed(2);

  return (
    <div className="cashier-ticket-stack">
      <div className="ticket-list">
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <h4>
                {ticket.orderType} - ${ticket.price.toFixed(2)}
              </h4>
              <ul>
                {ticket.orderType === "Drink" &&
                  ticket.options.drinks.map((drink, index) => (
                    <li key={index}>{drink}</li>
                  ))}
                {(ticket.orderType === "Bowl" ||
                  ticket.orderType === "Plate" ||
                  ticket.orderType === "A La Carte") &&
                  ticket.options.entrees.map((entree, index) => (
                    <li key={index}>{entree}</li>
                  ))}
                {(ticket.orderType === "Bowl" ||
                  ticket.orderType === "Plate" ||
                  ticket.orderType === "A La Carte") &&
                  ticket.options.sides.map((side, index) => (
                    <li key={index}>{side}</li>
                  ))}
                {ticket.orderType === "Appetizer" &&
                  ticket.options.apps.map((app, index) => (
                    <li key={index}>{app}</li>
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
