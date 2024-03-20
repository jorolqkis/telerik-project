import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "./constants.js";

const initialState = {
	assets: [],
	avatar: "",
	balance: 0,
	email: "",
	purchaseHistory: "",
	userId: "",
	username: "",
};

const userSlice = createSlice({
	name: `${SLICE_NAME}/user`,
	initialState,
	reducers: {
		setUser(state, action) {
			return (state = { ...state, ...action.payload });
		},
		resetUser() {
			return { ...initialState };
		},
	},
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
