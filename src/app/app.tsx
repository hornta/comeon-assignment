import React from "react";
import "./app.css";
import logo from "./logo.svg";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { LoginScreen } from "../screens/login-screen/login-screen";
import { GamesScreen } from "../screens/games-screen/games-screen";
import { AppRoute, RouteType } from "../shared/app-route";
import { Provider } from "react-redux";
import { store } from "../store";
import { GameDetailScreen } from "../screens/game-detail-screen/game-detail-screen";

export const App = () => (
	<Provider store={store}>
		<>
			<div className="ui one column center aligned page grid">
				<div className="column twelve wide">
					<img src={logo} alt="ComeOn Group" />
				</div>
			</div>
			<div className="main container">
				<BrowserRouter>
					<Switch>
						<AppRoute
							type={RouteType.RESTRICTED}
							path="/login"
							component={LoginScreen}
						/>
						<AppRoute
							type={RouteType.PRIVATE}
							path="/games"
							component={GamesScreen}
						/>
						<AppRoute
							type={RouteType.PRIVATE}
							path="/game/:code"
							component={GameDetailScreen}
						/>
						<Redirect to="/login" from="" />
					</Switch>
				</BrowserRouter>
			</div>
		</>
	</Provider>
);

export default App;
