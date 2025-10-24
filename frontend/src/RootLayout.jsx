import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const RootLayout = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<main className="p-8">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default RootLayout;
