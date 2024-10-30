import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeView() {
  const [inputText, setInputText] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const navigate = useNavigate();

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setDropdownValue(selectedValue);
    
  };

  const handleSubmit = () => {
    if (dropdownValue) {
      navigate(`/${dropdownValue}`);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="col-4">
        {/* Text Input */}
        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="textInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Employee ID"
          />
        </div>

        {/* Dropdown */}
        <div className="mb-3">
          <label htmlFor="dropdown" className="form-label">
            Select a view:
          </label>
          <select
            id="dropdown"
            className="form-select"
            value={dropdownValue}
            onChange={handleDropdownChange}
          >
            <option value="">Select</option>
            <option value="manager-view">Manager View</option>
            <option value="cashier-view">Cashier View</option>
            <option value="customer-view">Customer View</option>
            <option value="kitchen-view">Kitchen View</option>
            <option value="menu-view">Menu View</option>
          </select>
        </div>

        {/* Button */}
        <button className="btn btn-primary w-100" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default HomeView;
