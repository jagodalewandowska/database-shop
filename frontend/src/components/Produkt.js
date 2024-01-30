import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

const Produkty = () => {
    const [produkty, setProdukty] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [manageMode, setManageMode] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [newProdukt, setNewProdukt] = useState({
        nazwa: "",
        idProducenta: null,
        idKategorii: null,
        cenaBrutto: "",
        cenaNetto: "",
        vat: "",
        okresGwarancji: ""
    });

    useEffect(() => {
        axios
            .get("http://localhost:8082/api/products")
            .then((response) => {
                const sortedProdukty = response.data.sort((a, b) => a.idProd - b.idProd);
                setProdukty(sortedProdukty);
            })
            .catch((error) => {
                console.error("Error fetching produkty:", error);
            });

        // Reset editMode and newProdukt when manageMode changes
        setEditMode(null);
        setNewProdukt({
            nazwa: "",
            idProducenta: null,
            idKategorii: null,
            cenaBrutto: "",
            cenaNetto: "",
            vat: "",
            okresGwarancji: ""
        });
    }, [manageMode]);

    const isProduktNameExists = (id, name) => {
        return produkty.some((produkt) => produkt.nazwa.toLowerCase() === name.toLowerCase() && produkt.idProd !== id);
    };

    const handleAddProdukt = () => {
        setShowForm(true);
    };

    const handleSaveProdukt = () => {
        if (isProduktNameExists(0, newProdukt.nazwa)) {
            alert("Nazwa produktu istnieje w bazie. Wybierz inną nazwę.");
            return;
        }

        // Konwertuj niektóre pola na liczby przed wysłaniem do serwera
        const newProduktToSend = {
            ...newProdukt,
            idProducenta: parseInt(newProdukt.idProducenta),
            idKategorii: parseInt(newProdukt.idKategorii),
            cenaBrutto: parseFloat(newProdukt.cenaBrutto),
            cenaNetto: parseFloat(newProdukt.cenaNetto),
            vat: parseFloat(newProdukt.vat),
            okresGwarancji: parseInt(newProdukt.okresGwarancji)
        };

        axios.post("http://localhost:8082/api/products", newProduktToSend)
            .then((response) => {
                setProdukty([...produkty, response.data]);
                setShowForm(false);
                setNewProdukt({
                    nazwa: "",
                    idProducenta: null,
                    idKategorii: null,
                    cenaBrutto: "",
                    cenaNetto: "",
                    vat: "",
                    okresGwarancji: ""
                });
            })
            .catch((error) => {
                console.error("Error adding produkt:", error);
            });
    };

    const handleCancelAddProdukt = () => {
        setShowForm(false);
        setNewProdukt({
            nazwa: "",
            idProducenta: null,
            idKategorii: null,
            cenaBrutto: "",
            cenaNetto: "",
            vat: "",
            okresGwarancji: ""
        });
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setNewProdukt({
            nazwa: "",
            idProducenta: null,
            idKategorii: null,
            cenaBrutto: "",
            cenaNetto: "",
            vat: "",
            okresGwarancji: ""
        });
    };

    const handleDeleteProdukt = (produktId) => {
        axios.delete(`http://localhost:8082/api/products/${produktId}`)
            .then(() => {
                const updatedProdukty = produkty.filter((produkt) => produkt.idProd !== produktId);
                setProdukty(updatedProdukty);
            })
            .catch((error) => {
                console.error("Error deleting produkt:", error);
            });
    };

    const handleEditProdukt = (produktId) => {
        setEditMode(produktId);

        const produktToEdit = produkty.find((produkt) => produkt.idProd === produktId);
        if (produktToEdit) {
            setNewProdukt({ ...produktToEdit });
        }
    };

    const handleSaveEdit = (produktId, newValues) => {
        if (isProduktNameExists(produktId, newValues.nazwa)) {
            alert("Nazwa produktu istnieje w bazie. Wybierz inną nazwę.");
            return;
        }

        axios.put(`http://localhost:8082/api/products/${produktId}`, newValues, { headers: authHeader() })
            .then(() => {
                const updatedProdukty = produkty.map((produkt) => {
                    if (produkt.idProd === produktId) {
                        return { ...produkt, ...newValues };
                    }
                    return produkt;
                });
                setProdukty(updatedProdukty);
                setEditMode(null);
            })
            .catch((error) => {
                console.error("Error editing produkt:", error);
            });
    };

    return (
        <div className="container mt-4">
            <br />
            <h3 className="mb-4">Produkty</h3>
            <button
                className="btn btn-info mb-3"
                onClick={handleAddProdukt}
                disabled={manageMode}
            >
                Dodaj nowy produkt
            </button>
            <button
                className="btn btn-secondary mb-3 ml-2"
                onClick={() => setManageMode(!manageMode)}
            >
                {manageMode ? "Zakończ edytowanie" : "Zarządzaj"}
            </button>

            {showForm && (
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Wpisz nazwę produktu"
                        value={newProdukt.nazwa}
                        onChange={(e) => setNewProdukt({ ...newProdukt, nazwa: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ID Producenta"
                        value={newProdukt.idProducenta || ""}
                        onChange={(e) => setNewProdukt({ ...newProdukt, idProducenta: parseInt(e.target.value) || null })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ID Kategorii"
                        value={newProdukt.idKategorii || ""}
                        onChange={(e) => setNewProdukt({ ...newProdukt, idKategorii: parseInt(e.target.value) || null })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cena Brutto"
                        value={newProdukt.cenaBrutto}
                        onChange={(e) => setNewProdukt({ ...newProdukt, cenaBrutto: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cena Netto"
                        value={newProdukt.cenaNetto}
                        onChange={(e) => setNewProdukt({ ...newProdukt, cenaNetto: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="VAT"
                        value={newProdukt.vat}
                        onChange={(e) => setNewProdukt({ ...newProdukt, vat: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Okres Gwarancji"
                        value={newProdukt.okresGwarancji}
                        onChange={(e) => setNewProdukt({ ...newProdukt, okresGwarancji: e.target.value })}
                    />

                    <button className="btn btn-light mt-2" onClick={handleSaveProdukt}>
                        Zapisz
                    </button>
                    <button className="btn btn-secondary mt-2 ml-2" onClick={handleCancelAddProdukt}>
                        Anuluj
                    </button>
                </div>
            )}

            <div className="card-columns">
                {produkty.map((produkt) => (
                    <div key={produkt.idProd} className="card">
                        <div className="card-body">
                            {manageMode ? (
                                <div>
                                    {editMode === produkt.idProd ? (
                                        <div>
                                            <div className="form-group">
                                                <label>Nazwa produktu:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newProdukt.nazwa}
                                                    onChange={(e) => setNewProdukt({ ...newProdukt, nazwa: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>ID Producenta:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newProdukt.idProducenta || ""}
                                                    onChange={(e) => setNewProdukt({ ...newProdukt, idProducenta: parseInt(e.target.value) || null })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>ID Kategorii:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newProdukt.idKategorii || ""}
                                                    onChange={(e) => setNewProdukt({ ...newProdukt, idKategorii: parseInt(e.target.value) || null })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Cena Brutto:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newProdukt.cenaBrutto}
                                                    onChange={(e) => setNewProdukt({ ...newProdukt, cenaBrutto: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Cena Netto:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newProdukt.cenaNetto}
                                                    onChange={(e) => setNewProdukt({ ...newProdukt, cenaNetto: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>VAT:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newProdukt.vat}
                                                    onChange={(e) => setNewProdukt({ ...newProdukt, vat: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Okres Gwarancji:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newProdukt.okresGwarancji}
                                                    onChange={(e) => setNewProdukt({ ...newProdukt, okresGwarancji: e.target.value })}
                                                />
                                            </div>
                                            <button
                                                className="btn btn-info mt-2"
                                                onClick={() => handleSaveEdit(produkt.idProd, newProdukt)}
                                            >
                                                Zapisz
                                            </button>
                                            <button
                                                className="btn btn-secondary mt-2 ml-2"
                                                onClick={handleCancelEdit}
                                            >
                                                Anuluj
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h5 className="card-title">
                                                {`${produkt.idProd}. ${produkt.nazwa}`}
                                            </h5>
                                            <button
                                                className="btn btn-warning mt-2"
                                                onClick={() => handleEditProdukt(produkt.idProd)}
                                            >
                                                Edytuj
                                            </button>
                                            <button
                                                className="btn btn-danger mt-2 ml-2"
                                                onClick={() => handleDeleteProdukt(produkt.idProd)}
                                            >
                                                Usuń
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <h5 className="card-title">
                                    {`${produkt.idProd}. ${produkt.nazwa}`}
                                </h5>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Produkty;
