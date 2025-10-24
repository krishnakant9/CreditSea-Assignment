import React from "react";
import reactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import ReportDashboard from "./pages/ReportDashboard";
import ReportDetail from "./pages/ReportDetail";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/upload",
				element: <UploadPage />,
			},
			{
				path: "/reports",
				element: <ReportDetail />,
			},
			{
				path: "/reports/:reportId",
				element: <ReportDashboard />,
			},
		],
	},
]);

reactDom.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
