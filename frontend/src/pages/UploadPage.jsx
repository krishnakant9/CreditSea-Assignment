
import React from "react";
import FileUpload from "../components/FileUpload";

const UploadPage = () => {
	return (
		
		<div className="flex flex-col items-center justify-center py-12 px-4">
			<h1 className="text-5xl font-extrabold text-gray-900 mb-6">
				Upload New Report
			</h1>

			<p className="text-xl text-gray-600 mb-10 max-w-lg text-center">
				Select an XML file from your computer to upload and process.
			</p>

			<FileUpload />
		</div>
	);
};

export default UploadPage;
