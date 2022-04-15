import React, { useEffect, useState } from "react";
import "../css/home.css";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";

import SpotifyPlayer from "react-spotify-web-playback";
import MusicCard from "./../components/musicCard";

import "../css/musicPlayer.css";

function MusicPlayer() {
	useEffect(() => {
		const uriArray = [];
		const data = [];
		location.state.trackData.map((track) => {
			const url = track.album.images[0].url;
			const trackName = track.name;
			let artistName = [];
			track.artists.map((artistsData) => {
				artistName.push(artistsData.name);
			});
			artistName = artistName.join(" , ");
			const dataObject = {
				url: url,
				trackName: trackName,
				artistName: artistName,
			};
			// console.log(dataObject, "dataObj");
			data.push(dataObject);
			// console.log(track.uri);
			uriArray.push(track.uri);
		});

		// console.log(data);
		setTrackData(data);
		setTrackUri(uriArray);
		if (window.sessionStorage.getItem("auth_token") !== null) {
			setacessToken(window.sessionStorage.getItem("auth_token"));
		}
	}, []);

	const location = useLocation();
	const [accesstoken, setacessToken] = useState("");
	const [trackUri, setTrackUri] = useState(null);
	const [trackData, setTrackData] = useState(null);

	const client_id = process.env.REACT_APP_SPOTIFY_API_ID; // Your client id
	const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Your secret
	const auth_token = Buffer.from(
		`${client_id}:${client_secret}`,
		"utf-8"
	).toString("base64");

	// console.log(location.state, "props");
	return (
		<div className="MusicPlayerWrapper">
			{!location.state.accuracy && (
				<div className="playing">
					Playing Music for {location.state.mood} Mood
					{/* {console.log("token", accesstoken, trackData)} */}
				</div>
			)}
			{location.state.accuracy && (
				<div className="playing">
					Playing Music for {location.state.mood} ({location.state.accuracy} %)
					Mood
				</div>
			)}
			{accesstoken.length === 0 && (
				<div className="SpotifyPlayer">Login To Spotify to continue</div>
			)}
			{accesstoken.length !== 0 && (
				<div className="SpotifyPlayerWrapper">
					<div className="SpotifyPlayer">
						<SpotifyPlayer
							styles={{
								activeColor: "#fff",
								bgColor: "#333",
								color: "#fff",
								loaderColor: "#fff",
								sliderColor: "#1cb954",
								trackArtistColor: "#ccc",
								trackNameColor: "#fff",
							}}
							token={accesstoken}
							uris={trackUri}
							offset={0}
							// autoPlay={true}
						/>
					</div>
				</div>
			)}
			<div className="Playlisttitle">Playlist</div>
			{trackData && (
				<div className="MusicCardWrapper">
					{trackData.map((Info) => (
						<div>
							<MusicCard
								img={Info.url}
								artistName={Info.artistName}
								songName={Info.trackName}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default MusicPlayer;
