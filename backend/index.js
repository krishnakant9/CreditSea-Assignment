import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import reportRoute from "./routes/reportRoute.js";

dotenv.config();
connectDB();

const app = express();


app.use(
	cors({
		origin: ["https://credit-sea-assignment-xi.vercel.app"],
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true,
	})
);

app.use(express.json());


app.options("*", cors());

// ROUTES
app.use("/api/reports", reportRoute);

app.get("/", (req, res) => {
	res.send("CreditSea Backend API is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
