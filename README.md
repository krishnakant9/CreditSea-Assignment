
# CreditSea Full-Stack Engineer Assignment - Credit Report Generator

This repository contains the full-stack MERN (MongoDB, Express, React, Node.js) application designed to process and report on soft credit pull data from Experian XML files.
The application features a secure file upload endpoint, data extraction into a normalized MongoDB schema, and a polished React frontend for comprehensive reporting.

## 🔗 Submission Links

* **Live Demo URL (Frontend on Vercel, Backend on Render):** [[PASTE YOUR VERCEL LIVE LINK HERE]](https://credit-sea-assignment-xi.vercel.app/)

## 🛠️ Technical Stack & Implementation Details

* **Frontend:** React (Vite), React Router v6, Axios, Tailwind CSS
* **Backend:** Node.js, Express, Multer (**In-Memory Storage** for Serverless Deployment), xml2js, Mongoose
* **Database:** MongoDB Atlas

### Key Design Decisions
* **Deployment Strategy:** The application is configured as a split deployment (Frontend on Vercel, Backend on Render) to leverage the speed and convenience of serverless hosting.
* **XML Processing:** Multer is configured to use **in-memory storage** (`multer.memoryStorage()`) to handle file uploads on the Render serverless platform. The file is read from the buffer and then parsed by `xml2js`.
* **Schema Design:** The data is normalized with embedded sub-documents (an array of `CreditAccountSchema`) to efficiently store and query the repeating credit account information.
* **Frontend Routing:** Uses three main API routes to drive the UI: `/api/reports/upload`, `api/reports`, and `api/reports/:id`.

***

## 🚀 Setup and Local Development Instructions

Follow these steps to clone the repository and run the application locally.

### 1. Prerequisites

You must have the following installed:
* Node.js (LTS version 18+ and npm)
* A running MongoDB database (local or cloud like MongoDB Atlas)

### 2. Project Installation

Clone the repository and install dependencies for both the frontend and backend:

# Clone the repository
git clone 
cd creditsea-assignment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
3. Backend Configuration & Start
Create a file named .env in the backend/ directory.

Add your database connection string to this file. The value must be a valid MongoDB URI:

Code snippet

MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
Start the backend server:

Bash

cd backend
node index.js
(The API will start on http://localhost:5000)

4. Frontend Start
Start the frontend development server:

Bash

cd frontend
npm run dev
(The application will open in your browser on http://localhost:5173)

5. API Test
To test the full loop, ensure your local backend is running and then navigate to the local frontend URL (http://localhost:5173/). You can upload a sample XML file (like Sagar_Ugle1.xml) to see the data process and appear on the /reports dashboard.
