import React, { useState } from "react";
import "./css/cards.css";

function PickerCard({ url, title, onSelect }) {
	const [clicked, setClicked] = useState(false);

	const handelClick = () => {
		// console.log("Clicked");
		setClicked(!clicked);
		if (clicked) {
			onSelect("", false);
		} else {
			onSelect(title.toLowerCase(), true);
		}
	};
	return (
		<>
			{!clicked && (
				<div className="CardWrapper" onClick={() => handelClick()}>
					<div className="image">
						<img src={require(`../assets/MoodEmojis/${url}`)} />
					</div>
					<div className="imageTitle">{title}</div>
				</div>
			)}
			{clicked && (
				<div className="onClickCardWrapper" onClick={() => handelClick()}>
					{title} Mood Selected ... (Click again to deselect)
				</div>
			)}
		</>
	);
}

export default PickerCard;
