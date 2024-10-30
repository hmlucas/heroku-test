import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./css/MEmployees.css";
import InputField from "./components/InputField";
function MInventory() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="scroll-pane col-3">
          {/* Dropdown Menu */}
          <div className="dropdown mb-3">
            <button
              className="btn btn-secondary dropdown-toggle w-100"
              type="button"
              id="employeeDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Quantity
            </button>
            <ul
              className="dropdown-menu w-100"
              aria-labelledby="employeeDropdown"
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
          </div>

          {/* Example list of employees */}
          {[...Array(30).keys()].map((i) => (
            <p key={i}>Ingredient {i + 1}</p>
          ))}
        </div>

        <div className="main-content col-8">
          <h1>Inventory</h1>
          <div className="row my-3">
            <div className="template-box col">
              <h2>Query Inventory</h2>
              <div className="row">
                <InputField labelText="Item ID" id="itemID" />
                <InputField labelText="Item Name" id="itemName" />
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

          <div className="row my-3">
            <div className="template-box col">
              <h2>Edit Inventory</h2>
              <div className="row mt-3">
                <InputField labelText="Item ID" id="editItemID" />
                <InputField labelText="Item Name" id="editItemName" />
              </div>
              <div className="row mt-3">
                <InputField labelText="Item Count" id="editItemCount" />
                <InputField labelText="Item Measurement" id="editItemMeasurement" />
              </div>
              <div className="row mt-3">
                {/* wtf is Par????????? */}
                <InputField labelText="Par??" id="editItemPar" />
                <InputField labelText="Status" id="editItemStatus" />
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <button type="button" className="btn btn-primary w-10">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="template-box col">
              <h2>Order Items</h2>
              <div className="row mt-3">
                <InputField labelText="Item ID" id="orderItemID" />
                <InputField labelText="Amount" id="orderItemAmount" />
              </div>
             
              <div className="row mt-3">
                <div className="col-12">
                  <button type="button" className="btn btn-primary w-10">
                    Submit
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

export default MInventory;
