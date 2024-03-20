import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import MainContent from "../components/template/MainContent.jsx";
import { chartConfig } from "../configs/chart.config.js";
import {
	beginChartSimulation,
	fetchStockData,
	resetSimulation,
} from "../services/chartService/chartService.js";
import { setCurrentSymbol, setUser } from "../store";
import {
	getAllStocksFromFirestore,
	getFirestoreUserById,
} from "../firebase/utils/utils.js";
import { fetchNewsData } from "../services/httpService/httpService.js";
import "./base.css";

const Dashboard = () => {
	const [chartData, setChartData] = useState(chartConfig);
	const [stockSymbol, setStockSymbol] = useState("DXC");
	const [tableStockData, setTableStockData] = useState([]);
	const [news, setNews] = useState([]);

	const dispatch = useDispatch();
	const { userId } = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (chartData.series[0].data.length === 0) {
			return;
		}

		const chartSimulation = setInterval(() => {
			beginChartSimulation(stockSymbol, chartData, setChartData);
		}, 2000);

		return () => clearInterval(chartSimulation);
	}, [chartData]);

	useEffect(() => {
		dispatch(setCurrentSymbol(stockSymbol));

		resetSimulation(setChartData);
		fetchStockData(stockSymbol, setChartData);
	}, [stockSymbol]);

	useEffect(() => {
		getFirestoreUserById(userId)
			.then((userData) => {
				if (userData) {
					dispatch(
						setUser({
							userId: userData.userId,
							username: userData.displayName,
						}),
					);
				} else {
					console.log("User not found");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		fetchNewsData().then((data) => {
			const firstThreeItems = data.slice(0, 1);
			setNews(firstThreeItems);
		});
		getAllStocksFromFirestore().then((data) => {
			setTableStockData(data);
		});
	}, []);

	return (
		<>
			<MainContent
				currentSymbol={stockSymbol}
				setCurrentSymbol={setStockSymbol}
				chartData={chartData}
				stockData={tableStockData}
				news={news}
			/>
		</>
	);
};

export default Dashboard;
