import React from "react";
import "./results-list.css";

const NoUsersToDisplay = () => {
  return (
    <div>
      <div>Results List</div>
      <div>No relevant data found</div>
    </div>
  );
};

const ResultsList = ({ list, deleteOne }) => {
  const renderUsers = ({ _id, pasportId, credit, cash, isActive }) => (
    <div key={_id}>
      <div>User passport no.: {pasportId}</div>
      <div>User cash: {cash}</div>
      <div>User credit: {credit}</div>
      <div>Active user : {isActive ? "Yes" : "No"}</div>
      <button onClick={() => deleteOne(pasportId)}>Delete user</button>
    </div>
  );

  return (
    <div className="info--results-list">
      {list.length ? list.map(renderUsers) : <NoUsersToDisplay />}
    </div>
  );
  //return <div>check</div>;
};

export default ResultsList;
