import React from "react";
import { OPTIONS } from "../constants/newUser";

const SelectUser = ({ handleOptions }) => {
	return (
		<>
			<label>Is user Active?</label>
			<select placeholder="Is user Active?" onChange={handleOptions}>
				{OPTIONS.map(({ content, value }) => (
					<option key={content} value={value}>
						{content}
					</option>
				))}
			</select>
		</>
	);
};

export default React.memo(SelectUser);
