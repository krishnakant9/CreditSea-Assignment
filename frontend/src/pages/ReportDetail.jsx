
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';

const ReportDetail = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
       
        const res = await axios.get(
					" https://creditsea-assignment-s1mi.onrender.com/api/reports"
				);
        
        setReports(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setIsLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch reports.');
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center">
        Processed Reports
      </h1>

      {isLoading && <Loader />}

      {error && (
        <div className="text-center p-8 bg-white rounded-lg shadow-xl text-red-600">
          <h2 className="text-2xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && reports.length === 0 && (
        <div className="text-center p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Reports Found</h2>
          <p className="text-gray-600">
            Click here to{' '}
            <Link to="/upload" className="text-[#0075ff] hover:underline font-medium">
              upload one now
            </Link>
            .
          </p>
        </div>
      )}

      {!isLoading && !error && reports.length > 0 && (
        <div className="flex flex-col gap-6">
          {reports.map((report) => (
            <Link
              key={report._id}
              to={`/reports/${report._id}`}
              className="block p-6 bg-white rounded-lg shadow-xl 
                         border-2 border-transparent hover:border-[#0075ff]
                         hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                
              
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-semibold text-gray-800 hover:text-[#0075ff] transition-colors">
                    {report.name}
                  </h2>
                  <p className="text-gray-500 mt-1">PAN: {report.pan}</p>
                </div>
                
                
                <div className="flex flex-row md:flex-col items-baseline md:items-end gap-4 md:gap-0">
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-[#0075ff]">
                      {report.creditScore}
                    </p>
                    <span className="text-gray-500 ml-2">Credit Score</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    Processed: {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportDetail;