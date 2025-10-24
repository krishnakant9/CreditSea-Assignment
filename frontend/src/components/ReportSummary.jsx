
import React from "react";


const formatNumber = (num) => {
	return new Intl.NumberFormat("en-IN").format(num);
};

const ReportSummary = ({ summary }) => {
	return (
		
		<div className="bg-white p-6 rounded-lg shadow-xl">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">
				Report Summary
			</h2>

			
			<div className="grid grid-cols-2 gap-x-6 gap-y-5">
				<SummaryItem label="Total Accounts" value={summary.totalAccounts} />
				<SummaryItem label="Active Accounts" value={summary.activeAccounts} />
				<SummaryItem label="Closed Accounts" value={summary.closedAccounts} />
				<SummaryItem
					label="Last 7 Days Enquiries"
					value={summary.last7DaysCreditEnquiries}
				/>

				
				<SummaryItem
					label="Secured Amount"
					value={`₹${formatNumber(summary.securedAccountsAmount)}`}
				/>
				<SummaryItem
					label="Unsecured Amount"
					value={`₹${formatNumber(summary.unsecuredAccountsAmount)}`}
				/>

				
				<div className="col-span-2 mt-2">
					<p className="text-sm font-medium text-gray-500">
						Total Current Balance
					</p>
					<p className="text-2xl font-bold text-gray-900">
						{`₹${formatNumber(summary.currentBalanceAmount)}`}
					</p>
				</div>
			</div>
		</div>
	);
};


const SummaryItem = ({ label, value, className = "" }) => (
	<div>
		<p className="text-sm font-medium text-gray-500">{label}</p>
		<p className={`text-lg font-medium text-gray-900 ${className}`}>{value}</p>
	</div>
);

export default ReportSummary;
