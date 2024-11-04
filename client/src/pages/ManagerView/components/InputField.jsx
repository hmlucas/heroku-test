import PropTypes from 'prop-types';
function InputField({ labelText, id }) {
  return (
    <div className="col">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input type="text" className="form-control" id={id} />
    </div>
  );
}

InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default InputField;
