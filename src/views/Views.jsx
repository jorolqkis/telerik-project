// React Imports
import React, { Suspense } from "react";

// Third-Party Imports
import { Navigate, Route, Routes } from "react-router-dom";

// QuantumX Imports
import AppRoute from "../components/route/AppRoute";
import appConfig from "../configs/app.config";
import ProtectedRoute from "../guards/ProtectedRoute.jsx";
import PublicRoute from "../guards/PublicRoute.jsx";
import { protectedRoutes, publicRoutes } from "../configs/routes.config";

const { authenticatedEntryPath } = appConfig;

const AllRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<ProtectedRoute />}
			>
				<Route
					path="/"
					element={
						<Navigate
							replace
							to={authenticatedEntryPath}
						/>
					}
				/>
				{protectedRoutes.map((route, index) => (
					<Route
						key={route.key + index}
						path={route.path}
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<AppRoute
									routeKey={route.key}
									component={route.component}
								/>
							</Suspense>
						}
					/>
				))}
				<Route
					path="*"
					element={
						<Navigate
							replace
							to="/"
						/>
					}
				/>
			</Route>
			<Route
				path="/"
				element={<PublicRoute />}
			>
				{publicRoutes.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={
							<AppRoute
								routeKey={route.key}
								component={route.component}
							/>
						}
					/>
				))}
			</Route>
		</Routes>
	);
};

const Views = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AllRoutes />
		</Suspense>
	);
};

export default Views;
