// src/pages/ReportDashboard.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import BasicDetails from "../components/BasicDetails";
import ReportSummary from "../components/ReportSummary";
import CreditAccounts from "../components/CreditAccounts";

const ReportDashboard = () => {
    const { reportId } = useParams();

    console.log("Params from URL:", useParams());

    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(
                    `/api/reports/${reportId}`
                );
                setReport(res.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message || "Failed to fetch report.");
                setIsLoading(false);
            }
        };
        if (reportId) {
            fetchReport();
        }
    }, [reportId]);

    if (isLoading) {
        return <div className="text-center p-8">Loading report details...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600">{error}</div>;
    }

    if (!report) {
        return <div className="text-center p-8">Report not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <h1 className="text-4xl text-center font-extrabold text-gray-900 mb-8">
                Credit Report for {report.name}
            </h1>

            <div className="flex flex-col gap-8">
                <BasicDetails
                    name={report.name}
                    pan={report.pan}
                    mobilePhone={report.mobilePhone}
                    creditScore={report.creditScore}
                    addresses={report.addresses}
                />

                <CreditAccounts accounts={report.creditAccounts} />

                <ReportSummary summary={report.reportSummary} />
            </div>
        </div>
    );
};

export default ReportDashboard;
