import React from "react";
import { Link } from "react-router-dom";

import { UploadIcon,FileIcon } from "../../utils/constants.jsx";

const HomePage = () => {
	return (
		<div className="text-center p-8 max-w-4xl mx-auto">
			<h1 className="text-6xl font-extrabold text-gray-900 mb-6">
				CreditSea Report Generator
			</h1>

			<p className="text-xl text-gray-600 mb-16">
				Get instant insights from your XML credit reports.
			</p>

			<div className="flex flex-col md:flex-row justify-center items-center gap-10">
				<Link
					to="/upload"
					className="block w-80 p-8 bg-white rounded-lg shadow-xl 
                     border-2 border-transparent hover:border-[#0075ff] 
                     hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
				>
					<UploadIcon />
					<h2 className="text-2xl font-semibold text-gray-800 mb-3">
						Upload a Report
					</h2>

					<p className="text-gray-600">
						Get instant reports in seconds.
						<br />
						<span className="text-sm font-medium text-gray-500">
							Accepted format: .xml
						</span>
					</p>
				</Link>

				<Link
					to="/reports"
					className="block w-80 p-8 bg-white rounded-lg shadow-xl 
                     border-2 border-transparent hover:border-[#0075ff] 
                     hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
				>
					<FileIcon />
					<h2 className="text-2xl font-semibold text-gray-800 mb-3">
						View All Reports
					</h2>
					<p className="text-gray-600">
						Click here to browse all previously processed credit reports.
					</p>
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
