import React, { useReducer, Fragment, useContext, useCallback } from "react";
import { INPUTS_FIELDS } from "./constants/newUser";
import SelectUser from "./selectUser";
import addOneContext from "../../../pages/info/context/info";

const initialState = {
	passportId: "",
	credit: "",
	cash: "",
	active: "",
};

const reduce = (state, action) => {
	switch (action.name) {
		case "passportId":
			return { ...state, [action.name]: action.payload };
		case "credit":
			return { ...state, [action.name]: action.payload };
		case "cash":
			return { ...state, [action.name]: action.payload };
		case "active":
			return { ...state, [action.name]: action.payload };
		case "stateExecute":
			return { ...action.payload };
		default:
			return state;
	}
};

const AddNewUserFields = () => {
	const [inputFields, dispatcher] = useReducer(reduce, initialState);

	const addOne = useContext(addOneContext);

	const handleButton = () => {
		const { passportId, cash, credit } = inputFields;
		if (passportId !== "" && cash !== "" && credit !== "") {
			dispatcher({ name: "stateExecute", payload: initialState });
		}
		addOne(passportId, cash, credit);
	};

	const handleInput = ({ target: { value, name } }) => dispatcher({ name: name, payload: value });

	const handleOptions = useCallback(({ target: { value } }) => dispatcher({ name: "active", payload: value }), []);

	return (
		<>
			{INPUTS_FIELDS.map(({ content, name, ...inputAttributes }) => {
				return (
					<Fragment key={name}>
						<label>{content}</label>
						<input {...inputAttributes} name={name} value={inputFields[name]} onChange={handleInput} />
					</Fragment>
				);
			})}
			<SelectUser handleOptions={handleOptions} />

			<button onClick={handleButton}>Create user</button>
		</>
	);
};

export default AddNewUserFields;
