import * as faceapi from "face-api.js";
import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../css/scanMood.css";

function ScanMood() {
	const navigate = useNavigate();
	const imageRef = useRef();
	const canvasRef = useRef();
	const [imageUrl, setImageUrl] = useState(null);
	const [image, setImage] = useState(null);
	const [Detection, setDetection] = useState(null);
	const [emotion, setEmotion] = useState(null);
	const [token, setToken] = useState("");
	const [trackData, setTrackData] = useState(null);
	const [accuracy, setAccuracy] = useState(null);

	const handelFetch = async () => {
		// console.log(`${emotion} Fetched`);
		// setFetching(true);
		await getAudioFeatures_Track()
			.then((response) => {
				const { seeds, tracks } = response;
				setTrackData(tracks);
				// console.log(tracks, "tracks");
				navigate("music-player", {
					state: {
						token: token,
						trackData: tracks,
						mood: emotion,
						accuracy: accuracy,
					},
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
				seed_genres: "folk,acoustic,relaxative",
				market: market_arr,
				max_popularity: 70,
			};
		} else if (pres_mood === "happy") {
			return {
				limit: 23,
				seed_genres: "happy,summer,pop",
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
		} else if (pres_mood === "disgusted") {
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
		const parameters = getparams(emotion.toLowerCase());
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

	const loadModel = () => {
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
			faceapi.nets.faceExpressionNet.loadFromUri("/models"),
		])
			.then(handleImage)
			.catch((e) => console.log(e));
	};

	const handleImage = async () => {
		// console.log(imageRef.current, "Ref");
		const detection = await faceapi
			.detectSingleFace(imageRef.current, new faceapi.TinyFaceDetectorOptions())
			.withFaceExpressions();
		setDetection(detection);
		if (detection) {
			let max = detection.expressions["neutral"];
			let expression = "neutral";

			for (const mood in detection.expressions) {
				if (detection.expressions[mood] > max) {
					max = detection.expressions[mood];
					expression = mood;
				}
				// console.log(`${property}: ${detection.expressions[property]}`);
			}
			// console.log(max, expression, "max");
			setAccuracy(Math.round(max * 100));
			setEmotion(expression.toUpperCase());
			// console.log(detection.expressions, "detection");
		} else {
			setEmotion(null);
		}
	};

	useEffect(() => {
		// console.log(faceapi.nets.faceExpressionNet);
		loadModel();
		// image && console.log(URL.createObjectURL(image), "url");
		image && setImageUrl(URL.createObjectURL(image));
	}, [image]);
	return (
		<>
			<div className="scanMoodContainer">
				<div className="ScanInfo">Upload or Click Image</div>
				<div className="ScanImage">
					{!imageUrl && (
						<img
							src={require("../assets/ImageUpload.png")}
							alt="Moodify Loading ..."
							width="350"
							height="300"
						/>
					)}
					{imageUrl && (
						<img
							ref={imageRef}
							src={imageUrl}
							alt="Moodify Loading ..."
							width="350"
							height="300"
						/>
					)}
					<canvas ref={canvasRef} width="350" height="300" />
				</div>
				{!emotion && imageUrl && (
					<div className="playing">UNABLE TO DETECT MOOD !</div>
				)}
				{!Detection && (
					<div className="FetchButton">
						<input
							type="file"
							name="image-upload"
							id="input"
							accept="image/*"
							width="350"
							height="300"
							onChange={(e) => setImage(e.target.files[0])}
						/>
						<label htmlFor="input" className="image-upload">
							Set Image
						</label>
					</div>
				)}

				{Detection && (
					<div className="playing">
						DETECT MOOD IS: {emotion} ({accuracy} %)
					</div>
				)}
				{emotion && (
					<div className="FetchButton" onClick={() => handelFetch()}>
						Fetch Songs!
					</div>
				)}
			</div>
		</>
	);
}

export default ScanMood;
