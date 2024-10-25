import { useState } from "react";
import useEmployeeStore from "../store/useEmployeeStore";

function HomeView() {
  const [employeeId, setEmployeeId] = useState("");
  const { selectedEmployee, fetchEmployeeById, isLoading, error } =
    useEmployeeStore();

  const handleInputChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleSearch = () => {
    if (employeeId) {
      fetchEmployeeById(employeeId);
    }
  };

  return (
    <div>
      <h1>Search Employee by ID</h1>
      <input
        type="number"
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {selectedEmployee && (
        <div>
          <h2>Employee Details:</h2>
          <p>ID: {selectedEmployee.employee_id}</p>
          <p>
            Name: {selectedEmployee.first_name} {selectedEmployee.last_name}
          </p>
        </div>
      )}
    </div>
  );
}

export default HomeView;
