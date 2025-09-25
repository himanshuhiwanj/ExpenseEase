// src/app.ts

import express , {Request, Response } from "express"
import connectDB from './Database/db.js';
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/userRoutes.js";
import TransactionRouter from "./routes/Transaction.js";
import SummaryRouter from "./routes/Summary.js";
import DashboardRouter from "./routes/dashboard.js";
import GoalRouter from "./routes/goals.js";
import ReportRouter from "./routes/reports.js";

const app = express();
const PORT: number = 3000;

// Connect to the database
connectDB();
app.use(express.json());
app.use(cors({
  origin: "https://expense-ease-beta.vercel.app/"}));
app.use(bodyParser.json());

// Routes
app.use("/api/users", router);
app.use('/api/summary', SummaryRouter);
app.use('/api/transactions', TransactionRouter);
app.use('/api/dashboard', DashboardRouter);
app.use('/api/goals', GoalRouter);
app.use('/api/report', ReportRouter);

app.get('/', (req : Request, res : Response) => {
  res.send('Server is running and connected to the database!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});