
import React from "react";


const formatNumber = (num) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(num);
};

const CreditAccounts = ({ accounts }) => {
	return (
		
		<div className="bg-white p-6 rounded-lg shadow-xl">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">
				Credit Accounts Information
			</h2>

			
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Bank
							</th>
							<th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Account Number
							</th>
							<th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Current Balance
							</th>
							<th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Amount Overdue
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{accounts.map((account, index) => (
							<tr
								key={index}
								className={account.amountOverdue > 0 ? "bg-red-50" : ""}
							>
								<td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{account.bank}
								</td>
								<td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
									{account.accountNumber}
								</td>
								<td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
									{formatNumber(account.currentBalance)}
								</td>
								<td
									className={`px-5 py-4 whitespace-nowrap text-sm ${
										account.amountOverdue > 0
											? "text-red-600 font-bold"
											: "text-gray-700"
									}`}
								>
									{formatNumber(account.amountOverdue)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CreditAccounts;
