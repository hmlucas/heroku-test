import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./ManagerView.css";
import InputField from "./components/InputField";
function MOrderTrends() {
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh", overflow: "hidden" }}>
        <div className="col">
          <h2 style={{ margin: "10px" }}>Orders</h2>
          <div
            className="scroll-pane"
            style={{ height: "65vh", border: "3px solid lightblue" }}
            id="order-scroll-pane"
          >
            {/* Example list of orders */}
            {[...Array(30).keys()].map((i) => (
              <p key={i}>Order {i + 1}</p>
            ))}
          </div>
          <div id="order-info-box" style={{ height: "100%" }}>
            <h2>Order Information</h2>
            <div className="row">
              <InputField labelText="Order ID" id="orderInfoID" />
              <InputField labelText="Date" id="orderInfoDate" />
            </div>
            <div className="row">
              <InputField labelText="Price" id="orderInfoPrice" />
              <InputField labelText="Server" id="orderInfoServer" />
            </div>
          </div>
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
          <div
            className="under-query"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <button type="button" className="btn btn-primary w-10">
              X-Report
            </button>
            <button type="button" className="btn btn-primary w-10">
              Z-Report
            </button>
            <button type="button" className="btn btn-primary w-10">
              Daily Trends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MOrderTrends;
