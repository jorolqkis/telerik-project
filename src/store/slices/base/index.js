import { combineReducers } from "@reduxjs/toolkit";

import common from "./commonSlice.js";

const reducer = combineReducers({
	common,
});

export * from "./commonSlice.js";

export default reducer;
