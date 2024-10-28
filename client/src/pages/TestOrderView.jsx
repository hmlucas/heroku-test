// import { useState } from "react";
import useOrderStore from "../store/useOrderStore";

function TestOrderView() {
  const { orders, isLoading, error, addOrder } = useOrderStore();
  const handleInput = () => {
    addOrder();
  };
  return (
    <div>
      <h1>Search Employee by ID</h1>

      <button onClick={handleInput}>Search</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {orders && (
        <div>
          <h2>Order Details:</h2>
          <ul>
            {orders.map((order,index) => (
              <li key={index}>
                <p>{order.id}</p>
                <p>{order.payment_method}</p>
                <p>{order.order_date}</p>
                <p>{order.price}</p>
                <p>{order.employee_id}</p>
              </li>
            ))}
          </ul>{" "}
        </div>
      )}
    </div>
  );
}
export default TestOrderView;
