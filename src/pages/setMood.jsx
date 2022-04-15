import React, { useState } from "react";
import PickerCard from "../components/card";
import "../css/setMood.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function SetMood() {
	const navigate = useNavigate();
	const [mood, setMood] = useState("");
	const [token, setToken] = useState("");
	const [trackData, setTrackData] = useState(null);





	const handleSelect = (emotion, fetch) => {
		// console.log(emotion.length, fetch, "mood");
		setMood(emotion);
		// setFetching(!fetch);
	};

	const handelFetch = async () => {
		// console.log(`${mood} Fetched`);
		// setFetching(true);
		await getAudioFeatures_Track()
			.then((response) => {
				const { seeds, tracks } = response;
				setTrackData(tracks);
				// console.log(tracks, "tracks");
				navigate("music-player", {
					state: { token: token, trackData: tracks, mood: mood.toUpperCase() },
				});
			})
			.catch((e) => console.log(e, "error"));

		// window.location = "/music-player";
	};


	const getparams = (pres_mood) => {
		const market_arr = "IN";
		const artist = "06HL4z0CvFAxyc27GXpf02";
		if (pres_mood === "neutral") {
			return {
				limit: 23,
				seed_artists: "06HL4z0CvFAxyc27GXpf02",
				seed_genres: "folk,acoustic,relaxative",

				market: market_arr,
				max_popularity: 70,
			};
		} else if (pres_mood === "happy") {
			return {
				limit: 23,
				seed_genres: "happy,summer,pop",
				seed_artists: "06HL4z0CvFAxyc27GXpf02",
				market: "IN",
				max_popularity: 60,
			};
		} else if (pres_mood === "sad") {
			return {
				limit: 13,
				seed_genres: "rainy-day,sad,acoustic",
				market: market_arr,
				// seed_artists:artist,
				max_popularity: 80,
				min_energy: 0.85,
			};
		} else if (pres_mood === "angry") {
			return {
				limit: 13,
				seed_genres: "hard-rock,metal,",
				// seed_artists:artist,
				market: market_arr,
				max_popularity: 80,
				max_energy: 0.85,
			};
		} else if (pres_mood === "surprised") {
			return {
				limit: 13,
				// seed_artists:artist,
				seed_genres: "funk,party,show-tunes,electro-pop",
				market: market_arr,
				max_popularity: 80,
			};
		} else if (pres_mood === "fearful") {
			return {
				limit: 13,
				// seed_artists:artist,
				seed_genres: "blues,jazz,country",
				market: market_arr,
				max_popularity: 80,
			};
		} else if (pres_mood === "disgust") {
			return {
				limit: 13,
				// seed_artists:artist,
				seed_genres: "rap,jazz",
				market: market_arr,
				max_popularity: 80,
			};
		}
	};
	const getAudioFeatures_Track = async (track_id) => {
		//request token using getAuth() function
		// const access_token = token;
		const access_token = window.sessionStorage.getItem("auth_token");

		// console.log(access_token, "access token");

		const api_url = "https://api.spotify.com/v1/recommendations";
		const parameters = getparams(mood);
		// console.log(parameters, "pppp");
		//console.log(api_url);
		try {
			const { data } = await axios.get(api_url, {
				params: parameters,
				// params: {
				// 	limit: 13,
				// 	seed_genres: genere,
				// 	market: market_arr,
				// },
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			//console.log(response.data);
			setTrackData(data);
			return data;
		} catch (error) {
			console.log(error.message, "err");
		}
	};

	return (
		<div className="setMoodWrapper">
			<div className="leftWrapper">
				<div className="Instruction">Select Mood To Fetch Songs..</div>
				<div className="setMoodLeft">
					<div className="cardRowWrapper">
						<div className="cardRow">
							{(mood.length === 0 || mood === "neutral") && (
								<PickerCard
									url="neutral.png"
									title="Neutral"
									onSelect={handleSelect}
								/>
							)}
							{(mood.length === 0 || mood === "happy") && (
								<PickerCard
									url="happy.png"
									title="Happy"
									onSelect={handleSelect}
								/>
							)}
							{(mood.length === 0 || mood === "sad") && (
								<PickerCard url="sad.png" title="Sad" onSelect={handleSelect} />
							)}
						</div>
						<div className="cardRow">
							{(mood.length === 0 || mood === "angry") && (
								<PickerCard
									url="angry.png"
									title="Angry"
									onSelect={handleSelect}
								/>
							)}
						</div>
						<div className="cardRow">
							{(mood.length === 0 || mood === "surprised") && (
								<PickerCard
									url="surprised.png"
									title="Surprised"
									onSelect={handleSelect}
								/>
							)}
							{(mood.length === 0 || mood === "fearful") && (
								<PickerCard
									url="fear.png"
									title="Fearful"
									onSelect={handleSelect}
								/>
							)}
							{(mood.length === 0 || mood === "disgust") && (
								<PickerCard
									url="disgust.png"
									title="Disgust"
									onSelect={handleSelect}
								/>
							)}
						</div>
					</div>
				</div>
				{mood.length > 0 && (
					<>
						<div className="FetchButton" onClick={() => handelFetch()}>
							Fetch Songs!
						</div>
					</>
				)}
			</div>

			<div className="setMoodRight">
				<div className="setMood-image">
					<img src={require("../assets/setMood2.jpg")} alt="Freedom Blog" />
				</div>
			</div>
		</div>
	);
}

export default SetMood;
