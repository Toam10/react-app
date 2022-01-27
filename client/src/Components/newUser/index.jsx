import AddNewUserFields from "./components/addNewUserFields";

import "./new-user.css";

const NewUser = () => {
	return (
		<div className="info--new-user">
			<div>Add new user</div>
			<AddNewUserFields />
		</div>
	);
};

export default NewUser;
