import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../constants";
import type { Categories } from "../../types";

export const loadCategories = createAsyncThunk("loadCategories", async () => {
	const response = await fetch(`${API_BASE_URL}/categories`);
	if (!response.ok) {
		throw new Error("Failed to load categories");
	}
	return (await response.json()) as Categories;
});
