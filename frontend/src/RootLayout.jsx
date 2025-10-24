import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const RootLayout = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Navbar />
			<main className="grow">
				<div className="p-8">
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default RootLayout;
