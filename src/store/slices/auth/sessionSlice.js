import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "./constants.js";

const initialState = {
	signedIn: false,
	token: null,
};

const sessionSlice = createSlice({
	name: `${SLICE_NAME}/session`,
	initialState,
	reducers: {
		signInSuccess(state, action) {
			state.signedIn = true;
			state.token = action.payload;
		},
		signOutSuccess(state) {
			state.signedIn = false;
			state.token = null;
		},
	},
});

export const { signInSuccess, signOutSuccess } = sessionSlice.actions;
export default sessionSlice.reducer;
