import React, { useCallback, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
	validateEmail,
	validatePassword,
	validateUsername,
} from "../../../components/elements/validators.js";
import useAuth from "../../../hooks/useAuth";

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

	const usernameError = validateUsername(values.username);
	if (usernameError) {
		errors.username = usernameError;
	}

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

const SignUp = () => {
	const navigate = useNavigate();
	const { signUp } = useAuth();
	const [errors, setErrors] = useState({});

	const [values, setValues] = useState({
		username: "",
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
		[values, signUp],
	);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			const validationErrors = validate(values);
			setErrors(validationErrors);
			if (Object.keys(validationErrors).length === 0) {
				signUp({
					displayName: values.username,
					email: values.email,
					password: values.password,
				}).catch((error) => {
					// Handle errors
					console.error(error);
				});
			}
		},
		[values, signUp],
	);

	const handleSignInClick = useCallback(() => {
		navigate("/sign-in");
	}, [navigate]);

	return (
		<Container
			fluid
			data-testid="sign-up"
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
										QuantumX Sign Up
									</h3>
									<Form onSubmit={handleSubmit}>
										<Input
											type="text"
											name="username"
											placeholder="Enter your username"
											value={values.username}
											onChange={handleChange}
											errorMessage={errors.username}
										/>
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
												className="btn-lg btn-login text-uppercase fw-bold mb-2"
												type="submit"
											>
												Sign Up
											</Button>
											<div className="d-flex justify-content-center gap-2">
												<span>
													Already have an account?
												</span>
												<span
													role="button"
													className="text-decoration-underline fw-bold"
													onClick={handleSignInClick}
												>
													Sign in
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

export default SignUp;
