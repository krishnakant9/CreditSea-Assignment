import React from 'react';

const getScoreInfo = (score) => {
  if (score >= 650) {
    return { level: 'High', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300' };
  }
  if (score >= 580) {
    return { level: 'Mid', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-300' };
  }
  return { level: 'Low', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300' };
};

const BasicDetails = ({ name, pan, mobilePhone, creditScore, addresses }) => {
  const scoreInfo = getScoreInfo(creditScore);

  return (
		<div className="bg-white p-6 rounded-lg shadow-xl h-full">
			
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">
				Basic Details
			</h2>

			
			<div className="flex flex-col md:flex-row justify-between md:items-start">
				
				<div className="space-y-4 mb-6 md:mb-0">
					<div>
						<p className="text-sm font-medium text-gray-500">Name</p>
						<p className="text-xl font-medium text-gray-900">{name}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">PAN</p>
						<p className="text-lg font-medium text-gray-900">{pan}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">Mobile Phone</p>
						<p className="text-lg font-medium text-gray-900">{mobilePhone}</p>
					</div>
				</div>

				
				<div className="shrink-0 flex flex-col items-center mx-auto md:mx-0 md:ml-6">
					<div
						className={`w-32 h-32 rounded-full border-4 ${scoreInfo.border} ${scoreInfo.bg} flex flex-col justify-center items-center`}
					>
						<p className={`text-4xl font-bold ${scoreInfo.color}`}>
							{creditScore}
						</p>
						<p className={`text-lg font-semibold ${scoreInfo.color}`}>
							{scoreInfo.level}
						</p>
						
					</div>
					<p className="text-sm font-medium text-gray-700 mb-2">Credit Score</p>
				</div>
			</div>
			

			
			<div className="my-6 border-t border-gray-100"></div>

			
			<div>
				<p className="text-sm font-medium text-gray-500">Addresses</p>
				<div className="mt-2 space-y-1">
					{addresses.map((address, index) => (
						<p key={index} className="text-lg text-gray-900">
							• {address}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default BasicDetails;