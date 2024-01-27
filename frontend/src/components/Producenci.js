import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

const Producenci = () => {
    const [producents, setProducents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [manageMode, setManageMode] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [newProducent, setNewProducent] = useState({ nazwa: "" });

    useEffect(() => {
        axios
            .get("http://localhost:8082/api/producents")
            .then((response) => {
                const sortedProducents = response.data.sort((a, b) => a.idProducenta - b.idProducenta);
                setProducents(sortedProducents);
            })
            .catch((error) => {
                console.error("Error fetching producents:", error);
            });

        // Reset editMode and newProducent when manageMode changes
        setEditMode(null);
        setNewProducent({ nazwa: "" });
    }, [manageMode]);

    const isProducentNameExists = (name) => {
        return producents.some((producent) => producent.nazwa.toLowerCase() === name.toLowerCase());
    };

    const handleAddProducent = () => {

        if (isProducentNameExists(newProducent.nazwa)) {
            alert("Nazwa producenta istnieje w bazie. Wybierz inną nazwę.");
            return;
        }

        axios.post("http://localhost:8082/api/producents", newProducent)
            .then((response) => {
                setProducents([...producents, response.data]);
                setShowForm(false);
                setNewProducent({ nazwa: "" });
            })
            .catch((error) => {
                console.error("Error adding producent:", error);
            });
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setNewProducent({ nazwa: "" });
    };

    const handleDeleteProducent = (producentId) => {
        axios.delete(`http://localhost:8082/api/producents/${producentId}`)
            .then(() => {
                const updatedProducents = producents.filter((producent) => producent.idProducenta !== producentId);
                setProducents(updatedProducents);
            })
            .catch((error) => {
                console.error("Error deleting producent:", error);
            });
    };

    const handleEditProducent = (producentId) => {
        setEditMode(producentId);

        const producentToEdit = producents.find((producent) => producent.idProducenta === producentId);
        if (producentToEdit) {
            setNewProducent({ nazwa: producentToEdit.nazwa });
        }
    };

    const handleSaveEdit = (producentId, newName) => {
        if (isProducentNameExists(newName)) {
            alert("Nazwa producenta istnieje w bazie. Wybierz inną nazwę.");
            return;
        }
        axios.put(`http://localhost:8082/api/producents/${producentId}`, { nazwa: newName }, { headers: authHeader() })
            .then(() => {
                const updatedProducents = producents.map((producent) => {
                    if (producent.idProducenta === producentId) {
                        return { ...producent, nazwa: newName };
                    }
                    return producent;
                });
                setProducents(updatedProducents);
                setEditMode(null);
            })
            .catch((error) => {
                console.error("Error editing producent:", error);
            });
    };

    return (
        <div className="container mt-4">
            <br></br>
            <h3 className="mb-4">Producenci</h3>
            <button
                className="btn btn-info mb-3"
                onClick={() => setShowForm(true)}
                disabled={manageMode}
            >
                Dodaj nowego producenta
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
                        placeholder="Wpisz nazwę producenta"
                        value={newProducent.nazwa}
                        onChange={(e) => setNewProducent({ nazwa: e.target.value })}
                    />
                    <button className="btn btn-light mt-2" onClick={handleAddProducent}>
                        Zapisz
                    </button>
                </div>
            )}

            <div className="card-columns">
                {producents.map((producent) => (
                    <div key={producent.idProducenta} className="card">
                        <div className="card-body">
                            {editMode === producent.idProducenta ? (
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newProducent.nazwa}
                                        onChange={(e) => setNewProducent({ nazwa: e.target.value })}
                                    />
                                    <button
                                        className="btn btn-info mt-2"
                                        onClick={() => handleSaveEdit(producent.idProducenta, newProducent.nazwa)}
                                    >
                                        Zapisz
                                    </button>
                                    <button
                                        className="btn btn-secondary mt-2"
                                        onClick={handleCancelEdit}
                                    >
                                        Anuluj
                                    </button>
                                </div>
                            ) : (


                                <h5 className="card-title">
                                    {`${producent.idProducenta}. ${producent.nazwa}`}
                                    {manageMode && (

                                        <span>
                                            <br /><br />
                            <button
                                className="btn btn-info ml-2"
                                onClick={() => handleEditProducent(producent.idProducenta)}
                            >
                                Edytuj
                            </button>
                             <button
                                 className="btn btn-danger ml-2"
                                 onClick={() => handleDeleteProducent(producent.idProducenta)}
                             >
                                Usuń
                            </button>
                        </span>
                                    )}
                                </h5>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Producenci;