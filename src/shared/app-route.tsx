import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../store";

export enum RouteType {
	PUBLIC,
	RESTRICTED,
	PRIVATE,
}

interface PrivateRouteProps extends RouteProps {
	type: RouteType;
}

export const AppRoute = ({
	component: Component,
	type = RouteType.PUBLIC,
	...routeProps
}: PrivateRouteProps) => {
	const session = useAppSelector((state) => state.session);
	return (
		<Route
			{...routeProps}
			render={(props) => {
				if (type === RouteType.PRIVATE && session === null) {
					return (
						<Redirect
							to={{ pathname: "/login", state: { from: props.location } }}
						/>
					);
				}

				if (type === RouteType.RESTRICTED && session !== null) {
					return (
						<Redirect
							to={{ pathname: "/games", state: { from: props.location } }}
						/>
					);
				}

				return Component ? <Component {...props} /> : null;
			}}
		/>
	);
};
