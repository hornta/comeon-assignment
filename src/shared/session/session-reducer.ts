import { createReducer } from "@reduxjs/toolkit";
import { authenticate } from "../../screens/login-screen/login-actions";
import type { Player } from "../../types";
import { logout } from "./session-actions";
import { SESSION_STORAGE_KEY } from "../constants";

export type PlayerSession = Player | null;

const getPreloadedSession = () => {
	const persistedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
	const initialSessionState =
		persistedSession === null
			? null
			: (JSON.parse(persistedSession) as PlayerSession);

	return initialSessionState;
};

export const sessionReducer = createReducer(
	getPreloadedSession(),
	(builder) => {
		builder
			.addCase(authenticate.fulfilled, (state, action) => action.payload)
			.addCase(logout, () => null);
	}
);
