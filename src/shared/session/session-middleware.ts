import type { Middleware } from "@reduxjs/toolkit";
import { SESSION_STORAGE_KEY } from "../constants";
import { authenticate } from "../../screens/login-screen/login-actions";
import { logout } from "./session-actions";

export const sessionMiddleware: Middleware = () => (next) => (action) => {
	// eslint-disable-next-line unicorn/prefer-regexp-test
	if (logout.match(action)) {
		sessionStorage.removeItem(SESSION_STORAGE_KEY);
		// eslint-disable-next-line unicorn/prefer-regexp-test
	} else if (authenticate.fulfilled.match(action)) {
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(action.payload));
	}
	next(action);
};
