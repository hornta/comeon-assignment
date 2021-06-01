import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../shared/constants";
import type { Game } from "../../types";

export const loadGame = createAsyncThunk("loadGame", async (code: string) => {
	const response = await fetch(`${API_BASE_URL}/games?code=${code}`);
	if (!response.ok) {
		throw new Error("Failed to load game ");
	}
	return ((await response.json()) as Game[])[0];
});
