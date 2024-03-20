import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SignIn from "./SignIn";
import { Provider } from "react-redux";
import store from "../../../store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("firebase/app", () => ({
	initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
	getAuth: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
	getFirestore: jest.fn(),
}));

describe("SignIn component", () => {
	it("renders SignIn component", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignIn />
				</MemoryRouter>
			</Provider>,
		);
		expect(screen.getByText("QuantumX Sign In")).toBeInTheDocument();
	});

	it("renders email and password input fields", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignIn />
				</MemoryRouter>
			</Provider>,
		);
		expect(
			screen.getByPlaceholderText("Enter your email"),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Enter your Password"),
		).toBeInTheDocument();
	});

	it("displays error message for invalid email", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignIn />
				</MemoryRouter>
			</Provider>,
		);
		userEvent.type(
			screen.getByPlaceholderText("Enter your email"),
			"invalid-email",
		);
		fireEvent.submit(screen.getByRole("button", { name: "Sign in" }));
		expect(
			screen.getByText("Please enter a valid email address."),
		).toBeInTheDocument();
	});

	it("displays error message for short password", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignIn />
				</MemoryRouter>
			</Provider>,
		);
		userEvent.type(
			screen.getByPlaceholderText("Enter your Password"),
			"pass",
		);
		fireEvent.submit(screen.getByRole("button", { name: "Sign in" }));
		expect(
			screen.getByText("Password must be at least 8 characters long."),
		).toBeInTheDocument();
	});
});
