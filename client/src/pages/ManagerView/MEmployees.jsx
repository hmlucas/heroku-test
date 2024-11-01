import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import useEmployeeStore from "../../store/useEmployeeStore";
import "./ManagerView.css";
import React, { useEffect } from "react";
import InputField from "./components/InputField";

function MEmployees() {
  const { selectedEmployee, postEmployee, fetchEmployees, employees } =
    useEmployeeStore();

  const handleSubmit = async () => {
    await postEmployee(employee);
    await fetchEmployees(); 
    // clear form
    setEmployee({
      employee_id: 0,
      first_name: "",
      last_name: "",
      employee_role: "",
      birth_date: "",
      wage: 0,
      hire_date: "",
      is_active: false,
    });
  };

  const [employee, setEmployee] = React.useState({
    employee_id: 0,
    first_name: "",
    last_name: "",
    employee_role: "",
    birth_date: "",
    wage: 0,
    hire_date: "",
    is_active: false,
  });

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Update employee when selected employee changes
  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleInputChange = (field) => (e) => {
    setEmployee({ ...employee, [field]: e.target.value });
  };

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
              {employee.is_active ? "Active" : "Inactive"}
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

          {employees.length > 0 ? (
            employees.map((emp) => (
              <p key={emp.employee_id}>
                Employee: {emp.first_name} {emp.last_name}
              </p>
            ))
          ) : (
            <p>No employees found.</p>
          )}
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
              <h2>Add/Edit Employees</h2>
              <div className="row mt-3">
                <InputField
                  labelText="Employee ID"
                  id="editEmployeeID"
                  value={employee.employee_id}
                  onChange={handleInputChange("employee_id")}
                />
                <InputField
                  labelText="Status"
                  id="editEmployeeStatus"
                  value={employee.is_active ? "Active" : "Inactive"}
                  onChange={() => {}}
                />
              </div>
              <div className="row mt-3">
                <InputField
                  labelText="First Name"
                  id="editEmployeeFirstName"
                  value={employee.first_name}
                  onChange={handleInputChange("first_name")}
                />
                <InputField
                  labelText="Last Name"
                  id="editEmployeeLastName"
                  value={employee.last_name}
                  onChange={handleInputChange("last_name")}
                />
              </div>
              <div className="row mt-3">
                <InputField
                  labelText="Position"
                  id="editEmployeePosition"
                  value={employee.employee_role}
                  onChange={handleInputChange("employee_role")}
                />
                <InputField
                  labelText="Wage"
                  id="editEmployeeWage"
                  value={employee.wage}
                  onChange={handleInputChange("wage")}
                />
              </div>
              <div className="row mt-3">
                <InputField
                  labelText="Birth Date"
                  id="editEmployeeBirthDate"
                  value={employee.birth_date}
                  onChange={handleInputChange("birth_date")}
                />
                <InputField
                  labelText="Hire Date"
                  id="editEmployeeHireDate"
                  value={employee.hire_date}
                  onChange={handleInputChange("hire_date")}
                />
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}
                  >
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
