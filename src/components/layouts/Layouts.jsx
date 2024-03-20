// React Imports
import React, { useMemo, lazy, Suspense } from "react";
import useAuth from "../../hooks/useAuth.js";

const Layout = () => {
	const { authenticated } = useAuth();

	const AppLayout = useMemo(() => {
		if (authenticated) return lazy(() => import("./MainLayout"));

		return lazy(() => import("./AuthLayout"));
	}, [authenticated]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AppLayout />
		</Suspense>
	);
};

export default Layout;
