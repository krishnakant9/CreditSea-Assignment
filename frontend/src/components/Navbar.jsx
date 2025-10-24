
import React from "react";

import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="sticky top-0 z-10 flex justify-between items-center p-4 px-8 bg-white shadow-lg">
			
			<Link to="/">
				<img
					src="https://www.creditsea.com/_next/static/media/credit-sea-blue-h-latest.62519644.svg"
					alt="CreditSea Logo"
					className="h-8" 
				/>
			</Link>

			
			<div className="flex gap-6">
				<NavLink
					to="/upload"
					className={({ isActive }) => {
						return `text-lg no-underline font-medium transition-colors duration-200 ${
							isActive ? "text-[#0075ff]" : "text-gray-700"
						} hover:text-[#0075ff]`;
					}}
				>
					Upload
				</NavLink>
				<NavLink
					to="/reports"
					className={({ isActive }) => {
						console.log("NavLink /reports active:", isActive);
						return `text-lg no-underline font-medium transition-colors duration-200 ${
							isActive ? "text-[#0075ff]" : "text-gray-700"
						} hover:text-[#0075ff]`;
					}}
				>
					View Reports
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
