import { useState } from "react";

const InputForm = ({ label, ...inputAttributes }) => {
  return (
    <div>
      <form>
        <label>{label}</label>
        <br />
        <input {...inputAttributes} />
      </form>
    </div>
  );
};

const Toggler = ({
  title,
  inputStatus,
  handleToggle,
  name,
  ...inputAttributes
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = ({ target: { value } }) => setInputValue(value);

  return (
    <div className="info--toggler">
      <div>{title}</div>
      {inputStatus && (
        <InputForm
          {...inputAttributes}
          onChange={handleInput}
          value={inputValue}
        />
      )}
      <button
        onClick={() => {
          setInputValue("");
          handleToggle(name, inputValue);
        }}
      >
        Find
      </button>
    </div>
  );
};

export default Toggler;
