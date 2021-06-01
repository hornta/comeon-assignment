import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../shared/constants";
import type { RootState } from "../../store";
import type { Player } from "../../types";

export const editUsername = createAction<string>("login/editUsername");

export const editPassword = createAction<string>("login/editPassword");

interface AuthenticationSuccessResponse {
	player: Player;
}

interface AuthenticationError {
	status: string;
	error: string;
}

export const authenticate = createAsyncThunk<
	Player,
	undefined,
	{
		rejectValue: AuthenticationError;
		state: RootState;
	}
>("login/authenticate", async (_, { rejectWithValue, getState }) => {
	const response = await fetch(`${API_BASE_URL}/login`, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: getState().login.username,
			password: getState().login.password,
		}),
	});

	if (response.status === 400) {
		return rejectWithValue((await response.json()) as AuthenticationError);
	}
	const data = (await response.json()) as AuthenticationSuccessResponse;
	return data.player;
});
