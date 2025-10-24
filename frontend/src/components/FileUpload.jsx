
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const navigate = useNavigate(); 

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			setMessage(selectedFile.name); 
			setError(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			setMessage("Please select a file first.");
			setError(true);
			return;
		}

		setIsLoading(true);
		setMessage("");
		setError(false);

		const formData = new FormData();
		formData.append("xmlfile", file);

		try {
			const res = await axios.post("/api/reports/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setIsLoading(false);
			setMessage(res.data.message);
			setError(false);
			setFile(null);

			
			setTimeout(() => {
				navigate("/reports"); 
			}, 1500); 
		} catch (err) {
			setIsLoading(false);
			setMessage(
				err.response?.data?.message || "File upload failed. Please try again."
			);
			setError(true);
		}
	};

	return (
		
		<div className="w-full max-w-lg p-8 bg-white border border-gray-200 rounded-lg shadow-xl">
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label
						htmlFor="file-upload"
						className="w-full py-3 px-4 flex justify-center items-center gap-2
                       bg-[#0075ff] text-white font-semibold rounded-md
                       cursor-pointer hover:bg-[#005cbf] transition-colors duration-300"
					>
						
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 16.5V9.75m0 0l-3 3m3-3l3-3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.33-2.33 4.5 4.5 0 01-1.996 8.64z"
							/>
						</svg>
						{file ? "Change File" : "Choose an XML File"}
					</label>
					<input
						id="file-upload"
						type="file"
						accept=".xml"
						onChange={handleFileChange}
						className="hidden" 
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading || !file} 
					className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md
                     hover:bg-green-700 transition-colors duration-300
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					{isLoading ? "Processing..." : "Upload and Process"}
				</button>
			</form>

			
			{message && (
				<div className="mt-4 p-3 rounded-md text-center">
					<span className={`${error ? "text-red-600" : "text-gray-700"}`}>
						{message}
					</span>
					{!error && !isLoading && file === null && (
						<span className="text-gray-500 block text-sm">Redirecting...</span>
					)}
				</div>
			)}
		</div>
	);
};

export default FileUpload;
