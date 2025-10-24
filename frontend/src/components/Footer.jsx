// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-[#f7f8ff] border-t border-gray-200 mt-16">
			<div className="max-w-4xl mx-auto py-8 px-8 md:flex md:items-center md:justify-between">
				{" "}
				<div className="flex justify-center space-x-6 md:order-2">
					<Link to="/" className="text-gray-500 hover:text-gray-900">
						About Us
					</Link>
					<Link to="/" className="text-gray-500 hover:text-gray-900">
						Privacy Policy
					</Link>
					<Link to="/" className="text-gray-500 hover:text-gray-900">
						T&C
					</Link>
				</div>
				<div className="mt-8 md:mt-0 md:order-1">
					<p className="text-center text-gray-500">
						© {new Date().getFullYear()} innovate. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
