import userReducer, { setUser, resetUser } from "./userSlice";

describe("userSlice", () => {
	it("should return the initial state", () => {
		const initialState = {
			assets: [],
			avatar: "",
			balance: 0,
			email: "",
			purchaseHistory: "",
			userId: "",
			username: "",
		};
		const state = userReducer(undefined, {});
		expect(state).toEqual(initialState);
	});

	it("should handle setUser action", () => {
		const initialState = {
			assets: [],
			avatar: "",
			balance: 0,
			email: "",
			purchaseHistory: "",
			userId: "",
			username: "",
		};

		const user = {
			assets: ["BTC", "ETH"],
			avatar: "user.jpg",
			balance: 1000,
			email: "user@example.com",
			purchaseHistory: "...",
			userId: "123",
			username: "user123",
		};

		const state = userReducer(initialState, setUser(user));

		expect(state).toEqual({
			assets: ["BTC", "ETH"],
			avatar: "user.jpg",
			balance: 1000,
			email: "user@example.com",
			purchaseHistory: "...",
			userId: "123",
			username: "user123",
		});
	});

	it("should handle resetUser action", () => {
		const currentState = {
			assets: ["BTC", "ETH"],
			avatar: "user.jpg",
			balance: 1000,
			email: "user@example.com",
			purchaseHistory: "...",
			userId: "123",
			username: "user123",
		};

		const state = userReducer(currentState, resetUser());

		expect(state).toEqual({
			assets: [],
			avatar: "",
			balance: 0,
			email: "",
			purchaseHistory: "",
			userId: "",
			username: "",
		});
	});
});
