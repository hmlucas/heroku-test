import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UniversalNavbar from "../components/UniversalNavbar";

const initialOrders = [
  { id: 1, name: "Order 1" },
  { id: 2, name: "Order 2" },
  { id: 3, name: "Order 3" },
  { id: 4, name: "Order 4" },
  { id: 5, name: "Order 5" },
  { id: 6, name: "Order 6" },
  { id: 7, name: "Order 7" },
  { id: 8, name: "Order 8" },
  { id: 9, name: "Order 9" },
  { id: 10, name: "Order 10" },
  { id: 11, name: "Order 11" },
  { id: 12, name: "Order 12" },
  { id: 13, name: "Order 13" },
  { id: 14, name: "Order 14" },
  { id: 15, name: "Order 15" },
  { id: 16, name: "Order 16" },
];

function KitchenView() {
  const [orders, setOrders] = useState(initialOrders);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const ordersPerPage = 4;

  const handleDone = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    setCompletedOrders([...completedOrders, order]);
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * ordersPerPage < orders.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleShowAll = () => {
    setShowAllOrders(!showAllOrders);
  };

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const currentOrders = showAllOrders
    ? orders
    : orders.slice(
        currentPage * ordersPerPage,
        (currentPage + 1) * ordersPerPage
      );

  return (
    <div className="container" style={{ paddingBottom: "5rem" }}>
      <h1>Kitchen View</h1>
      <div className="d-flex flex-wrap">
        {currentOrders.map((order) => (
          <div
            key={order.id}
            className="border p-3 m-2"
            style={{
              width: "calc(25% - 20px)",
              height: "400px",
              position: "relative",
            }}
          >
            <p>{order.name}</p>
            <button
              onClick={() => handleDone(order.id)}
              className="btn btn-success"
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              Done
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`btn ${
            currentPage === 0 ? "btn-secondary" : "btn-primary"
          } me-2`}
        >
          Back
        </button>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * ordersPerPage >= orders.length}
          className={`btn ${
            (currentPage + 1) * ordersPerPage >= orders.length
              ? "btn-secondary"
              : "btn-primary"
          } me-2`}
        >
          Next
        </button>
        <button onClick={handleShowAll} className="btn btn-primary">
          {showAllOrders ? "Show Paginated" : "Show All"}
        </button>
      </div>
      <div className="mt-3">
        <button
          onClick={handleToggleCompleted}
          className="btn btn-primary mt-2"
        >
          {showCompleted ? "Hide Completed Orders" : "Show Completed Orders"}
        </button>
        {showCompleted && (
          <div>
            <h2>Completed Orders</h2>
            <ul>
              {completedOrders.map((order) => (
                <li key={order.id}>{order.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <UniversalNavbar />
    </div>
  );
}

export default KitchenView;
