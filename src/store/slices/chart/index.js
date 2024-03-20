import { combineReducers } from "@reduxjs/toolkit";

import chart from "./chartSlice.js";

const reducer = combineReducers({
	chart,
});

export * from "./chartSlice.js";

export default reducer;
