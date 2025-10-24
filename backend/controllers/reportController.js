import Report from "../models/report.js";
import fs from "fs";
import xml2js from "xml2js";

const parser = new xml2js.Parser({ explicitArray: false });

const formatAddresses = (accounts) => {
	const addressSet = new Set();
	if (!accounts || !Array.isArray(accounts)) {
		return [];
	}

	accounts.forEach((account) => {
		const addr = account?.CAIS_Holder_Address_Details;

		if (addr) {
			const addressParts = [
				addr.First_Line_Of_Address_non_normalized,
				addr.Second_Line_Of_Address_non_normalized,
				addr.Third_Line_Of_Address_non_normalized,
				addr.City_non_normalized,
			].filter(Boolean);

			let formattedAddress = addressParts.join(", ");
			const zip = addr?.ZIP_Postal_Code_non_normalized;

			if (zip) {
				formattedAddress += ` - ${zip}`;
			}
			addressSet.add(formattedAddress);
		}
	});
	return Array.from(addressSet);
};

export const uploadReport = async (req, res) => {
	try {
		if (!req.file) {
			return res
				.status(400)
				.json({ message: "No file uploaded or file type was incorrect." });
		}

		const filePath = req.file.path;

		const xmlData = fs.readFileSync(filePath, "utf-8");

		parser.parseString(xmlData, async (err, result) => {
			if (err) {
				fs.unlinkSync(filePath); // Delete the temp file
				return res.status(400).json({ message: "Invalid XML file format." });
			}

			try {
				const reportData = result.INProfileResponse;
				const applicantDetails =
					reportData.Current_Application.Current_Application_Details
						.Current_Applicant_Details;
				const summary = reportData.CAIS_Account.CAIS_Summary;
				const accounts = reportData.CAIS_Account.CAIS_Account_DETAILS;

				const accountArray = Array.isArray(accounts) ? accounts : [accounts];

				const mappedData = {
					// Basic Details
					name: `${applicantDetails.First_Name} ${applicantDetails.Last_Name}`,
					mobilePhone: applicantDetails.MobilePhoneNumber,
					pan: accountArray[0].CAIS_Holder_Details.Income_TAX_PAN,
					creditScore: parseInt(reportData.SCORE.BureauScore, 10),

					addresses: formatAddresses(accountArray),

					// Report Summary
					reportSummary: {
						totalAccounts: parseInt(
							summary.Credit_Account.CreditAccountTotal,
							10
						),
						activeAccounts: parseInt(
							summary.Credit_Account.CreditAccountActive,
							10
						),
						closedAccounts: parseInt(
							summary.Credit_Account.CreditAccountClosed,
							10
						),
						currentBalanceAmount: parseFloat(
							summary.Total_Outstanding_Balance.Outstanding_Balance_All
						),
						securedAccountsAmount: parseFloat(
							summary.Total_Outstanding_Balance.Outstanding_Balance_Secured
						),
						unsecuredAccountsAmount: parseFloat(
							summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured
						),
						last7DaysCreditEnquiries: parseInt(
							reportData.TotalCAPS_Summary.TotalCAPSLast7Days,
							10
						),
					},

					// Credit Accounts Information
					creditAccounts: accountArray.map((account) => ({
						bank: account.Subscriber_Name.trim(),
						accountNumber: account.Account_Number,
						amountOverdue: parseFloat(account.Amount_Past_Due || 0),
						currentBalance: parseFloat(account.Current_Balance || 0),
					})),
				};

				const newReport = new Report(mappedData);
				await newReport.save();

				// Delete the temporary file
				fs.unlinkSync(filePath);

				res.status(201).json({
					message: "File uploaded, parsed, and saved successfully!",
					reportId: newReport._id,
				});
			} catch (dbError) {
				console.error("Error saving to database:", dbError);
				fs.unlinkSync(filePath); // Delete temp file
				res.status(500).json({
					message: "Error processing file data.",
					error: dbError.message,
				});
			}
		});
	} catch (error) {
		console.error("Error in uploadReport controller:", error);

		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: "Server error.", error: error.message });
	}
};

export const getReports = async (req, res) => {
	try {
		const reports = await Report.find({});

		res.status(200).json(reports);
	} catch (error) {
		console.error("Error fetching reports:", error);
		res.status(500).json({ message: "Server error." });
	}
};

export const getReportById = async (req, res) => {
	try {
		const report = await Report.findById(req.params.id);

		if (!report) {
			return res.status(404).json({ message: "Report not found" });
		}
		res.status(200).json(report);
	} catch (error) {
		console.error("Error fetching report by ID:", error);
		res.status(500).json({ message: "Server error." });
	}
};
