import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer.js";

export const persistConfig = {
	key: "QuantumX Brain",
	keyPrefix: "",
	storage,
	whitelist: ["auth"],
};

const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer()),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

store.asyncReducers = {};

export const persistor = persistStore(store);

export const injectReducer = (key, reducer) => {
	if (store.asyncReducers) {
		if (store.asyncReducers[key]) {
			return false;
		}
		store.asyncReducers[key] = reducer;
		store.replaceReducer(
			persistReducer(persistConfig, rootReducer(store.asyncReducers)),
		);
	}
	persistor.persist();
	return store;
};

export default store;
