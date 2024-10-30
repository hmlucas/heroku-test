import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./ManagerView.css";
import InputField from "./components/InputField";
function MOrderTrends() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="scroll-pane col-3">
          {/* Dropdown Menu
          <div className="dropdown mb-3">
            <button
              className="btn btn-secondary dropdown-toggle w-100"
              type="button"
              id="orderDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Quantity
            </button>
            <ul
              className="dropdown-menu w-100"
              aria-labelledby="orderDropdown"
            >
              <li>
                <button className="dropdown-item" type="button">
                  a quantity
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button">
                  another quantity?
                </button>
              </li>
            </ul>
          </div> */}
          <h2>Orders</h2>
          {/* Example list of orders */}
          {[...Array(30).keys()].map((i) => (
            <p key={i}>Order {i + 1}</p>
          ))}
        </div>

        <div className="main-content col-8">
          <h1>Orders and Trends</h1>
          <div className="row my-3">
            <div className="template-box col">
              <h2>Query Menu Items</h2>
              <div className="row">
                <InputField labelText="Order ID" id="orderID" />
                <InputField labelText="Price" id="orderPrice" />
              </div>
              <div className="row">
                <InputField labelText="Start Date" id="orderStartDate" />
                <InputField labelText="End Date" id="orderEndDate" />
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <button type="button" className="btn btn-primary w-10">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MOrderTrends;
