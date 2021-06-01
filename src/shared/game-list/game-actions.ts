import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../constants";
import type { Games } from "../../types";

export const loadGames = createAsyncThunk("loadGames", async () => {
	const response = await fetch(`${API_BASE_URL}/games`);
	if (!response.ok) {
		throw new Error("Failed to load games");
	}
	return (await response.json()) as Games;
});
