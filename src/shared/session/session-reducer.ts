import { createReducer } from "@reduxjs/toolkit";
import { authenticate } from "../../screens/login-screen/login-actions";
import type { Player } from "../../types";
import { logout } from "./session-actions";

export type PlayerSession = Player | null;

export const sessionReducer = createReducer<PlayerSession>(null, (builder) => {
	builder
		.addCase(authenticate.fulfilled, (state, action) => action.payload)
		.addCase(logout, () => null);
});
