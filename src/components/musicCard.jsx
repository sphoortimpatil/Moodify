import React from "react";
import "../css/MusicCard.css";

function MusicCard({ img, songName, artistName }) {
	return (
		<div className="MusicCard">
			<div className="cardWrapper">
				<div className="MusicCardImage">
					<img
						// src={require("../assets/background.jpg")}
						src={img}
						alt="Moodify Loading ..."
						width="140"
						height="140"
					/>
				</div>
				<div className="info">
					<div className="songName">{songName}</div>
					<div className="artistName">{artistName}</div>
				</div>
			</div>
		</div>
	);
}

export default MusicCard;
