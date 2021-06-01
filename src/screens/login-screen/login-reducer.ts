import { createReducer } from "@reduxjs/toolkit";
import { authenticate, editPassword, editUsername } from "./login-actions";

enum LoginStatus {
	IDLE,
	PENDING,
	FULFILLED,
	REJECTED,
}

export interface LoginState {
	username: string;
	password: string;
	rejectedMessage: string | null;
	status: LoginStatus;
}

export const initialLoginState: LoginState = {
	username: "",
	password: "",
	rejectedMessage: "",
	status: LoginStatus.IDLE,
};

export const loginReducer = createReducer(initialLoginState, (builder) => {
	builder
		.addCase(editUsername, (state, action) => {
			state.username = action.payload;
		})
		.addCase(editPassword, (state, action) => {
			state.password = action.payload;
		})
		.addCase(authenticate.pending, (state) => {
			state.status = LoginStatus.PENDING;
			state.rejectedMessage = null;
		})
		.addCase(authenticate.fulfilled, (state) => {
			state.status = LoginStatus.IDLE;
			state.username = "";
			state.password = "";
			state.rejectedMessage = null;
		})
		.addCase(authenticate.rejected, (state, action) => {
			state.status = LoginStatus.REJECTED;

			if (action.payload) {
				state.rejectedMessage = action.payload.error;
			} else {
				if (action.error.message) {
					state.rejectedMessage = action.error.message;
				}
			}
		});
});
