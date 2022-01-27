import { useState } from "react";
import EditForm from "../../Components/editForm";

const Edit = () => {
  const [editMode, setEditMode] = useState("");

  return (
    <div>
      <button onClick={() => setEditMode("credit")}>Update credit</button>
      <button onClick={() => setEditMode("cash")}>Update cash</button>
      <button onClick={() => setEditMode("status")}>
        Update activitity status
      </button>
      {editMode && <EditForm name={editMode} />}
    </div>
  );
};
export default Edit;
