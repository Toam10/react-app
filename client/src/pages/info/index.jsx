import React, { useState, useEffect } from "react";
import Api from "../../Components/api/Api";
import Toggler from "../../Components/toggler";
import ResultsList from "../../Components/resultsList";
import NewUser from "../../Components/newUser";
import { TOGGLERS_ATTRIBUTES } from "../../constants/info/info.constants";
import "./info.css";
import { addOneContext } from "./context/info";

const Info = () => {
	const [currentData, setCurrentData] = useState([]);

	const getAll = async () => {
		const { data } = await Api.get("users");
		return data;
	};

	const getOne = async (id) => {
		if (id.length > 1) {
			const { data } = await Api.get(`users/${id}`);
			return data;
		} else return [];
	};

	const getByMinCash = async (cash) => {
		if (cash.length > 0) {
			const { data } = await Api.get(`users/?cash=${cash}`);
			return data;
		} else return [];
	};

	const getByMinCashFromActive = async (cash) => {
		if (cash.length > 0) {
			const { data } = await Api.get(`users/?cash=${cash}&&isActive=true`);
			return data;
		} else return [];
	};

	const deleteOne = async (passportId) => {
		await Api.delete(`users/${passportId}`);
		const remainedUsers = await Api.get("users");
		setCurrentData(remainedUsers);
		//bug try to fix -- not bug actually
	};

	const addOne = async (passportId, cash, credit, active) => {
		const Dto = {
			pasportId: parseInt(passportId),
			cash: parseInt(cash),
			credit: parseInt(credit),
			isActive: JSON.parse(active),
		};
		await Api.post("users", Dto);
		const users = await Api.get("users");
		setCurrentData(users);
		//bug try to fix -- not bug actually
	};

	const handleToggle = async (name, inputValue) => {
		switch (name) {
			case "getAll":
				const users = await getAll();
				setCurrentData(users);
				break;

			case "getOne":
				const user = await getOne(inputValue);
				setCurrentData(user);
				break;

			case "getOneByCash":
				const usersByMinCash = await getByMinCash(inputValue);
				setCurrentData(usersByMinCash);
				break;

			case "getActiveByCash":
				const activeUsersByMinCash = await getByMinCashFromActive(inputValue);
				setCurrentData(activeUsersByMinCash);
				break;

			default:
				return;
		}
	};

	return (
		<div className="info">
			<addOneContext.Provider value={addOne}>
				<div>
					<NewUser />
				</div>
				<div>
					<ResultsList list={currentData} deleteOne={deleteOne} />
				</div>
				<div>
					{TOGGLERS_ATTRIBUTES.map((attributes) => (
						<Toggler key={attributes.name} handleToggle={handleToggle} {...attributes} />
					))}
				</div>
			</addOneContext.Provider>
		</div>
	);
};
export default Info;
