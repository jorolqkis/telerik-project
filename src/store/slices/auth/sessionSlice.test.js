import { configureStore } from "@reduxjs/toolkit";
import sessionReducer, { signInSuccess, signOutSuccess } from "./sessionSlice";

describe("sessionSlice reducer", () => {
	it("should handle signInSuccess", () => {
		const initialState = {
			signedIn: false,
			token: null,
		};

		const nextState = sessionReducer(
			initialState,
			signInSuccess("mockToken"),
		);

		expect(nextState).toEqual({
			signedIn: true,
			token: "mockToken",
		});
	});

	it("should handle signOutSuccess", () => {
		const initialState = {
			signedIn: true,
			token: "mockToken",
		};

		const nextState = sessionReducer(initialState, signOutSuccess());

		expect(nextState).toEqual({
			signedIn: false,
			token: null,
		});
	});

	it("should handle unknown action", () => {
		const initialState = {
			signedIn: true,
			token: "mockToken",
		};

		const nextState = sessionReducer(initialState, {
			type: "UNKNOWN_ACTION",
		});

		expect(nextState).toEqual(initialState);
	});
});

describe("sessionSlice integration with store", () => {
	it("should handle actions through the store", () => {
		const store = configureStore({ reducer: { session: sessionReducer } });

		store.dispatch(signInSuccess("mockToken"));

		expect(store.getState().session).toEqual({
			signedIn: true,
			token: "mockToken",
		});

		store.dispatch(signOutSuccess());

		expect(store.getState().session).toEqual({
			signedIn: false,
			token: null,
		});
	});
});
