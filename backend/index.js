import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import reportRoute from "./routes/reportRoute.js";

connectDB();

dotenv.config();

const app = express();
app.use(cors());

app.use("/api/reports", reportRoute);
const PORT = process.env.PORT || 5000;


app.use(express.json());


app.get("/", (req, res) => {
	res.send("CreditSea Backend API is running!");
});



app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
