import React from "react";
import { useEffect } from "react";

function SpotifyLogin() {
	// const REACT_APP_AUTHORIZE_URL = process.env.REACT_APP_REDIRECT_URL;
	const {
		REACT_APP_SPOTIFY_API_ID,
		REACT_APP_SPOTIFY_CLIENT_SECRET,
		REACT_APP_AUTHORIZE_URL,
		REACT_APP_REDIRECT_URL,
	} = process.env;
	const scopes = [
		"user-modify-playback-state",
		"user-read-playback-state",
		"user-read-currently-playing",
		"app-remote-control",
		"user-library-modify",
		"user-read-email",
	];
	
	useEffect(() => {
		console.log(REACT_APP_REDIRECT_URL);
		window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_SPOTIFY_API_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=${scopes.join(
			"%20"
		)}&response_type=token&show_dialog=true`;
		//    http://localhost:3000/callback#access_token=BQD1f_Y5H7j8W42E6FEjlIL2YYAYia9X_jt22yFH_rRl73v0a4VU02FYG-s4Mt92nFeO2jsiVL5aUJsU8TQ1o4y-5PglR1TqA_YUeWvek8e37PTraRHZzLShjSY_v4h3lrxaseB86Sw5snjUkfx7mRBsR9479UMW7153mgLiNaXKxwipUfoYMw20&token_type=Bearer&expires_in=3600
		// console.log(window.location);
	}, []);

	return <div></div>;
}

export default SpotifyLogin;
