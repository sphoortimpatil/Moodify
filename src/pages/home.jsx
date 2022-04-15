import React, { useState, useEffect } from "react";
import "../css/home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home(props) {
	useEffect(() => {
		const location = window.location.hash.substring(1).split("&");
		// console.log(window.location);
		if (window.location.href !== window.location.origin + "/") {
			const token = location[0].split("=")[1];
			// console.log("token", token);
			window.sessionStorage.setItem("auth_token", token);
			// window.location.hash = "";
			// http://localhost:3000/#access_token=BQA93nNUDQNeY_5t5OwvAHYyB9btwguuas_4VvTEuIYRECUQxz_a6ds2DBHa64VoIstpnlTDxSj-QBd3r6E0qPbtjWGgBeKq6zAerd-MyJTz6MBAP703YcwH6Ta-Z0zIvitmfJjBNBCq-01W3_ExEXxIFs8vhXg37IhUaoix00gW03BydHAIheoi&token_type=Bearer&expires_in=3600
			window.location = process.env.REACT_APP_REDIRECT_URL;
		}
	}, []);
	const navigate = useNavigate();
	const setMood = () => {
		// console.log(props, "clicked");
		navigate("set-mood");
	};
	const scanMood = () => {
		// console.log(props, "clicked");
		navigate("scan-mood");
	};
	return (
		<>
			<div
				className="home"
				//  style={{ backgroundImage: `url(${background})` }}
			>
				<div className="head-image">
					<img
						src={require("../assets/background.jpg")}
						alt="Moodify Loading ..."
					/>
				</div>
				<div className="homeBottom">
					<div className="textContainer">
						<div className="p1">MOOD</div>

						<div className="p2">ify</div>
					</div>
					<div className="taglineWrapper">
						<h1>Music for every mood ...</h1>
					</div>
					<div className="spotifyLink">
						{/* <a
							href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
						>
							Click to Login Spotify
						</a> */}
					</div>
				</div>
				<div className="ButtonWrapper">
					<div className="setButton" onClick={() => setMood()}>
						Set Mood
					</div>
					<div className="scanButton" onClick={() => scanMood()}>
						Scan Mood
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
