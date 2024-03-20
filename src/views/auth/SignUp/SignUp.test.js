import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../../store";

jest.mock("firebase/app", () => ({
	initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
	getAuth: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
	getFirestore: jest.fn(),
}));

describe("SignUp component", () => {
	it("renders SignUp component", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignUp />
				</MemoryRouter>
			</Provider>,
		);
		expect(screen.getByText("QuantumX Sign Up")).toBeInTheDocument();
	});

	it("renders username, email, and password input fields", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignUp />
				</MemoryRouter>
			</Provider>,
		);
		expect(
			screen.getByPlaceholderText("Enter your username"),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Enter your email"),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Enter your Password"),
		).toBeInTheDocument();
	});

	it("displays error message for invalid username", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignUp />
				</MemoryRouter>
			</Provider>,
		);
		userEvent.type(
			screen.getByPlaceholderText("Enter your username"),
			"us",
		);
		fireEvent.submit(screen.getByRole("button", { name: "Sign Up" }));
		expect(
			screen.getByText("Username must be at least 3 characters long."),
		).toBeInTheDocument();
	});

	it("displays error message for invalid email", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignUp />
				</MemoryRouter>
			</Provider>,
		);
		userEvent.type(
			screen.getByPlaceholderText("Enter your email"),
			"invalid-email",
		);
		fireEvent.submit(screen.getByRole("button", { name: "Sign Up" }));
		expect(
			screen.getByText("Please enter a valid email address."),
		).toBeInTheDocument();
	});

	it("displays error message for short password", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SignUp />
				</MemoryRouter>
			</Provider>,
		);
		userEvent.type(
			screen.getByPlaceholderText("Enter your Password"),
			"pass",
		);
		fireEvent.submit(screen.getByRole("button", { name: "Sign Up" }));
		expect(
			screen.getByText("Password must be at least 8 characters long."),
		).toBeInTheDocument();
	});
});
