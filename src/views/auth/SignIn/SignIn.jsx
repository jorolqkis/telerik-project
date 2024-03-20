import React, { useCallback, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
	validateEmail,
	validatePassword,
} from "../../../components/elements/validators.js";
import useAuth from "../../../hooks/useAuth.js";
import "./SignIn.css";

// Create a reusable Input component
const Input = ({ type, name, placeholder, value, onChange, errorMessage }) => (
	<div className="form-floating mb-3">
		<input
			type={type}
			name={name}
			className={`form-control ${errorMessage ? "is-invalid" : ""}`}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
		<label>{placeholder}</label>
		<div className="invalid-feedback">{errorMessage}</div>
	</div>
);

const validate = (values) => {
	let errors = {};

	const emailError = validateEmail(values.email);
	if (emailError) {
		errors.email = emailError;
	}

	const passwordError = validatePassword(values.password);
	if (passwordError) {
		errors.password = passwordError;
	}

	return errors;
};

const SignIn = () => {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [errors, setErrors] = useState({});

	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const handleChange = useCallback(
		(event) => {
			setValues((prevValues) => ({
				...prevValues,
				[event.target.name]: event.target.value,
			}));
		},
		[values, signIn],
	);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			const validationErrors = validate(values);
			setErrors(validationErrors);
			if (Object.keys(validationErrors).length === 0) {
				signIn({
					email: values.email,
					password: values.password,
				}).catch((error) => {
					// Handle errors
					console.error(error);
				});
			}
		},
		[values, signIn],
	);

	const handleSignUpClick = useCallback(() => {
		navigate("/sign-up");
	}, [navigate]);

	return (
		<Container
			fluid
			className="ps-md-0"
			data-testid="sign-in"
		>
			<Row className="g-0">
				<Col
					md={4}
					lg={6}
					className="d-none d-md-flex bg-image"
				/>
				<Col
					md={8}
					lg={6}
				>
					<div className="login d-flex align-items-center py-5">
						<Container>
							<Row>
								<Col
									md={9}
									lg={8}
									className="mx-auto"
								>
									<h3 className="login-heading text-center fw-bold mb-4">
										QuantumX Sign In
									</h3>
									<Form onSubmit={handleSubmit}>
										<Input
											type="email"
											name="email"
											placeholder="Enter your email"
											value={values.email}
											onChange={handleChange}
											errorMessage={errors.email}
										/>
										<Input
											type="password"
											name="password"
											placeholder="Enter your Password"
											value={values.password}
											onChange={handleChange}
											errorMessage={errors.password}
										/>
										<div className="d-grid">
											<Button
												className="btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
												type="submit"
											>
												Sign in
											</Button>
											<div className="d-flex justify-content-center gap-2">
												<span>
													Do not have an account?
												</span>
												<span
													role="button"
													className="text-decoration-underline fw-bold"
													onClick={handleSignUpClick}
												>
													Sign Up
												</span>
											</div>
										</div>
									</Form>
								</Col>
							</Row>
						</Container>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default SignIn;
