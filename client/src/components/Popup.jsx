import "./Popup.css";

// eslint-disable-next-line react/prop-types
const Popup = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login event :)");
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputField" className="form-label">
              Manager Logout
            </label>
            <input
              type="text"
              className="form-control"
              id="inputField"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={onClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
