import React, { useState, useEffect } from "react";
import axios from 'axios';
import authHeader from "../services/auth-header";

const ZamowieniaList = () => {
    const [zamowienia, setZamowienia] = useState([]);

    useEffect(() => {
        const fetchZamowienia = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/zamowienia", { headers: authHeader() });
                setZamowienia(response.data);
            } catch (error) {
                console.error(`Error fetching zamowienia: ${error}`);
            }
        };

        fetchZamowienia();
    }, []);

    return (
        <div className="container">
            <br></br>
            <h3>Zamówienia</h3>

            {zamowienia.length === 0 && <p>No zamowienia available.</p>}

            <div className="row">
                {zamowienia.map((zamowienie) => (
                    <div key={zamowienie.idZam} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order ID: {zamowienie.idZam}</h5>
                                <p className="card-text">Client ID: {zamowienie.idKlienta}</p>
                                <p className="card-text">Order Date: {zamowienie.dataZamowienia}</p>
                                <p className="card-text">Total Cost: {zamowienie.kosztCalkowity} PLN</p>
                                <p className="card-text">Payment Method: {zamowienie.sposobOplaty}</p>
                                <p className="card-text">Invoice ID: {zamowienie.idFaktury}</p>
                                <p className="card-text">Description: {zamowienie.opis}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZamowieniaList;
