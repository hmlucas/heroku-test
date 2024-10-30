import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./css/MEmployees.css";
import InputField from "./components/InputField";

function MEmployees() {
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
              Status
            </button>
            <ul
              className="dropdown-menu w-100"
              aria-labelledby="employeeDropdown"
            >
              <li>
                <button className="dropdown-item" type="button">
                  Active
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button">
                  Inactive
                </button>
              </li>
            </ul>
          </div>

          {/* Example list of employees */}
          {[...Array(30).keys()].map((i) => (
            <p key={i}>Employee {i + 1}</p>
          ))}
        </div>

        <div className="main-content col-8">
          <h1>Employees</h1>
          <div className="row my-3">
            <div className="template-box col">

              <h2>Query Employees</h2>
              <div className="row">
                <InputField labelText="Employee ID" id="employeeID" />
                <InputField labelText="Employee Name" id="employeeName" />
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <button type="button" className="btn btn-primary w-100">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="template-box col">
              <h2>Edit Employees</h2>
              <div className="row mt-3">
                <InputField labelText="Employee ID" id="editEmployeeID" />
                <InputField labelText="Status" id="editEmployeeStatus" />
              </div>
              <div className="row mt-3">
                <InputField labelText="First Name" id="editEmployeeFirstName" />
                <InputField labelText="Last Name" id="editEmployeeLastName" />
              </div>
              <div className="row mt-3">
                <InputField labelText="Position" id="editEmployeePosition" />
                <InputField labelText="Wage" id="editEmployeeWage" />
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <button type="button" className="btn btn-primary w-100">
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

export default MEmployees;
