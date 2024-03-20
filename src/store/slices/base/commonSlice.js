import { createSlice } from "@reduxjs/toolkit";

import { SLICE_NAME } from "./constants.js";

export const initialState = {
	currentRouteKey: "",
};

export const commonSlice = createSlice({
	name: `${SLICE_NAME}/common`,
	initialState,
	reducers: {
		setCurrentRouteKey: (state, action) => {
			state.currentRouteKey = action.payload;
		},
	},
});

export const { setCurrentRouteKey } = commonSlice.actions;

export default commonSlice.reducer;
