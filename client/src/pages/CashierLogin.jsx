import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmployeeStore from "../store/useEmployeeStore";
import UniversalNavbar from "../components/UniversalNavbar";

function CashierLogin() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (inputText) {
      setCashier(inputText);
    }
    navigate(`/cashier-view`);
  };
  // to transfer to cashier view
  const setCashier = useEmployeeStore((state) => state.selectedCashier);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="col-4">
        {/* Text Input */}
        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">
            Cashier Login
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

        {/* Button */}
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <UniversalNavbar />
    </div>
  );
}

export default CashierLogin;
