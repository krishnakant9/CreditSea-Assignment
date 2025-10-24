import mongoose from "mongoose";

const creditAccountSchema = new mongoose.Schema({
    bank: { type: String, required: true },
    accountNumber: { type: String, required: true },
    amountOverdue: { type: Number, required: true },
    currentBalance: { type: Number, required: true },
});

const reportSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		mobilePhone: { type: String, required: true, unique: true },
		pan: { type: String, required: true },
		creditScore: { type: Number, required: true },
		addresses: { type: [String], required: true },
		reportSummary: {
			totalAccounts: { type: Number, required: true },
			activeAccounts: { type: Number, required: true },
			closedAccounts: { type: Number, required: true },
			currentBalanceAmount: { type: Number, required: true },
			securedAccountsAmount: { type: Number, required: true },
			unsecuredAccountsAmount: { type: Number, required: true },
			last7DaysCreditEnquiries: { type: Number, required: true },
		},
		creditAccounts: [creditAccountSchema],
	},
	{ timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;


