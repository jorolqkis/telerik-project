import { createSlice } from "@reduxjs/toolkit";

import { SLICE_NAME } from "./constants.js";

export const initialStateChart = {
	currentSymbol: "",
};

export const chartSlice = createSlice({
	name: `${SLICE_NAME}`,
	initialState: initialStateChart,
	reducers: {
		setCurrentSymbol: (state, action) => {
			state.currentSymbol = action.payload;
		},
	},
});

export const { setCurrentSymbol } = chartSlice.actions;

export default chartSlice.reducer;
