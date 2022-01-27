import { useState } from "react";

const EditForm = ({ name }) => {
  const [creditOrCash, setCreditOrCash] = useState("");
  const [status, setStatus] = useState("");
  const [passportId, setPassportId] = useState("");

  const handleStatusEdit = (value) => {
    setStatus(value);
  };

  console.log(typeof handleStatusEdit);
  console.log("passport", passportId);
  console.log("status", status);
  console.log("credit/cash", creditOrCash);

  const handleCashOrCreditEdit = (value) => {
    setCreditOrCash(value);
  };

  return (
    <div>
      <div>
        <label>Enter passport ID</label>
        <br />
        <input
          type="number"
          placeholder="Enter passport ID"
          value={passportId}
          onChange={(event) => setPassportId(event.target.value)}
        />
      </div>
      <label>Update {name}</label> <br />
      {name !== "status" ? (
        <CreditOrCashField
          handleStatusEdit={handleStatusEdit}
          handleCashOrCreditEdit={handleCashOrCreditEdit}
        />
      ) : (
        <StatusField />
      )}
      <button>Save Changes</button>
    </div>
  );
  //add check of types
};
export default EditForm;

const CreditOrCashField = ({ handleCashOrCreditEdit }) => {
  return (
    <div>
      <input
        type="number"
        placeholder="Only number"
        onChange={(event) => handleCashOrCreditEdit(event.target.value)}
      />
    </div>
  );
};

const StatusField = ({ handleStatusEdit }) => {
  return (
    <div>
      <select onChange={(event) => handleStatusEdit(event.target.value)}>
        <option value="">Choose activity status</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    </div>
  );
};
