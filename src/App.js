import React from "react";



import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import "./css/app.css";

import Home from "./pages/home";
import MusicPlayer from "./pages/musicPlayer";
import SetMood from "./pages/setMood";
import ScanMood from "./pages/scanMood";

import AppNavbar from "./components/Navbar";
import SpotifyLogin from "./pages/login";
import SpotifyLogout from "./pages/logout";

function App() {
	return (
		<div className="App">
			<AppNavbar />
			{/* <div style={{ backgroundColor: "green" }}>"Hiiiiiii"</div> */}
			{/* <Home/> */}
			{/* <SetMood /> */}
			<div className="content">
				<Routes>
					<Route path="/logout" element={<SpotifyLogout />} />
					<Route path="/login" element={<SpotifyLogin />} />
					<Route path="/scan-mood" element={<ScanMood />} />
					<Route path="/set-mood" element={<SetMood />}></Route>
					<Route path="/set-mood/music-player" element={<MusicPlayer />} />
					<Route path="scan-mood/music-player" element={<MusicPlayer />} />

					<Route path="/" element={<Home />} />
					{/* error page <Route path="*" element={<Home />} />  */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
