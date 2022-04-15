import React, { useEffect } from "react";

function SpotifyLogout(props) {
	useEffect(() => {
		console.log("close");
		sessionStorage.clear();
		window.location = "/";
	}, []);

	return null;
}

export default SpotifyLogout;
