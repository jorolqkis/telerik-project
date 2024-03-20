import { configureStore } from "@reduxjs/toolkit";
import commonReducer, { setCurrentRouteKey, initialState } from "./commonSlice";

describe("commonSlice reducer", () => {
	it("should handle setCurrentRouteKey", () => {
		const nextState = commonReducer(
			initialState,
			setCurrentRouteKey("dashboard"),
		);

		expect(nextState).toEqual({
			currentRouteKey: "dashboard",
		});
	});

	it("should handle multiple setCurrentRouteKey calls", () => {
		let state = initialState;

		state = commonReducer(state, setCurrentRouteKey("dashboard"));
		expect(state).toEqual({
			currentRouteKey: "dashboard",
		});

		state = commonReducer(state, setCurrentRouteKey("profile"));
		expect(state).toEqual({
			currentRouteKey: "profile",
		});
	});

	it("should handle unknown action", () => {
		const state = initialState;

		const nextState = commonReducer(state, { type: "UNKNOWN_ACTION" });

		expect(nextState).toEqual(state);
	});
});

describe("commonSlice integration with store", () => {
	it("should handle actions through the store", () => {
		const store = configureStore({ reducer: { common: commonReducer } });

		store.dispatch(setCurrentRouteKey("dashboard"));

		expect(store.getState().common).toEqual({
			currentRouteKey: "dashboard",
		});

		store.dispatch(setCurrentRouteKey("profile"));

		expect(store.getState().common).toEqual({
			currentRouteKey: "profile",
		});
	});
});
