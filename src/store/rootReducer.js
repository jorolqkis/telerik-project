import { combineReducers } from "redux";

import auth from "./slices/auth/index.js";
import base from "./slices/base/index.js";
import chart from "./slices/chart/index.js";

const staticReducers = {
	chart,
	auth,
	base,
};

const rootReducer = (asyncReducers) => (state, action) => {
	const combinedReducer = combineReducers({
		...staticReducers,
		...asyncReducers,
	});
	return combinedReducer(state, action);
};

export default rootReducer;
