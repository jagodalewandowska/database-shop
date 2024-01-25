import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

    useEffect(() => {
        axios
            .get("http://localhost:8082/api/producents")
            .then((response) => {
                const sortedJobs = sortJobs(response.data, sortOrder);
                setJobs(sortedJobs);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, [sortOrder]);

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
    };

    const sortJobs = (jobsToSort, order) => {
        return jobsToSort.sort((a, b) => {
            const comparison = a.title.localeCompare(b.nazwa);
            return order === "asc" ? comparison : -comparison;
        });
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Oferty pracy</h3>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" onClick={toggleSortOrder}>
                        {sortOrder === "asc" ? " ▲" : " ▼"}
                         Id
                    </th>
                    <th scope="col">Nazwa</th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td>{job.idProducenta}</td>
                        <td>{job.nazwa}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
