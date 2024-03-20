import { configureStore } from "@reduxjs/toolkit";
import chartReducer, {
	setCurrentSymbol,
	initialStateChart,
} from "./chartSlice";

describe("chartSlice reducer", () => {
	it("should handle setCurrentSymbol", () => {
		const nextState = chartReducer(
			initialStateChart,
			setCurrentSymbol("AAPL"),
		);

		expect(nextState).toEqual({
			currentSymbol: "AAPL",
		});
	});

	it("should handle multiple setCurrentSymbol calls", () => {
		let state = initialStateChart;

		state = chartReducer(state, setCurrentSymbol("AAPL"));
		expect(state).toEqual({
			currentSymbol: "AAPL",
		});

		state = chartReducer(state, setCurrentSymbol("GOOGL"));
		expect(state).toEqual({
			currentSymbol: "GOOGL",
		});
	});

	it("should handle unknown action", () => {
		const state = initialStateChart;

		const nextState = chartReducer(state, { type: "UNKNOWN_ACTION" });

		expect(nextState).toEqual(state);
	});
});

describe("chartSlice integration with store", () => {
	it("should handle actions through the store", () => {
		const store = configureStore({ reducer: { chart: chartReducer } });

		store.dispatch(setCurrentSymbol("AAPL"));

		expect(store.getState().chart).toEqual({
			currentSymbol: "AAPL",
		});

		store.dispatch(setCurrentSymbol("GOOGL"));

		expect(store.getState().chart).toEqual({
			currentSymbol: "GOOGL",
		});
	});
});
