import "./CashierView.css";

const TicketStack = ({ tickets }) => {
  return (
    <div className="cashier-ticket-stack">
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            <p>Item Name: {ticket.itemName}</p> {/* Display item name */}
            <p>Meal Type: {ticket.mealType}</p>
            <p>Price: ${ticket.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketStack;
