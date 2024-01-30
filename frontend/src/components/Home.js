import React, { useState, useEffect } from "react";
import axios from 'axios';
import authHeader from "../services/auth-header";
import Modal from "react-modal";

const Produkty = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [producentName, setProducentName] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/products", { headers: authHeader() });
                setProducts(response.data);
            } catch (error) {
                console.error(`Error fetching products: ${error}`);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/categories", { headers: authHeader() });
                setCategories(response.data);
            } catch (error) {
                console.error(`Error fetching categories: ${error}`);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducentName = async (id_producenta) => {
        try {
            const response = await axios.get(`http://localhost:8082/api/producents/${id_producenta}`, { headers: authHeader() });
            setProducentName(response.data.nazwa);
        } catch (error) {
            console.error(`Error fetching producer name: ${error}`);
        }
    };

    const fetchCategoryName = async (id_kategorii) => {
        try {
            const response = await axios.get(`http://localhost:8082/api/categories/${id_kategorii}`, { headers: authHeader() });
            setCategoryName(response.data.nazwa);
        } catch (error) {
            console.error(`Error fetching producer name: ${error}`);
        }
    };

    const openModal = async (product) => {
        setSelectedProduct(product);
        await fetchProducentName(product.idProducenta);
        await fetchCategoryName(product.idKategorii);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setProducentName(null);
        setModalOpen(false);
    };

    const findCategoryIdByName = (categoryName) => {
        if (categoryName === "Wszystkie") {
            return null;
        }

        const category = categories.find(category => category.nazwa === categoryName);
        const foundId = category.id;
        return foundId;
    };


    const handleCategoryChange = (event) => {
        const selectedName = event.target.value;
        const newSelectedId = findCategoryIdByName(selectedName);
        setSelectedCategoryId(newSelectedId);
    };

    const filteredProducts = selectedCategoryId
        ? products.filter((product) => {
            return product.idKategorii === selectedCategoryId;
        })
        : products;


    return (
        <div className="container">
            <br></br>
            <h3>Katalog</h3>
            <br></br>

            <div className="form-group">
                <label htmlFor="categorySelect">Wybierz kategorię:</label>
                <select
                    className="form-control"
                    id="categorySelect"
                    onChange={handleCategoryChange}
                    defaultValue={selectedCategoryId === undefined ? "Wszystkie" : selectedCategoryId}
                >
                    <option value="Wszystkie">Wszystkie</option>
                    {categories.map((category) => (
                        <option key={category.idKategorii} value={category.idKategorii}>
                            {category.nazwa}
                        </option>
                    ))}
                </select>


            </div>

            {filteredProducts.length === 0 && <p>Brak produktów.</p>}

            <div className="row">
                {filteredProducts.map((product) => (
                    <div key={product.id_prod} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.nazwa}</h5>
                                <p className="card-text">Cena: {product.cenaNetto} PLN</p>
                                <button
                                    className="btn btn-info"
                                    onClick={() => openModal(product)}
                                >
                                    Pokaż szczegóły
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Szczegóły"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60%',
                        padding: '20px',
                        borderRadius: '8px',
                    },
                }}
            >
                {selectedProduct && (
                    <div>
                        <br></br>
                        <center>
                            <h2>{selectedProduct.nazwa}</h2>
                        </center>
                        <br></br>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>Nazwa producenta</td>
                                <td>{producentName}</td>
                            </tr>
                            <tr>
                                <td>Kategoria</td>
                                <td>{categoryName}</td>
                            </tr>
                            <tr>
                                <td>Cena brutto</td>
                                <td>{selectedProduct.cenaBrutto} PLN</td>
                            </tr>
                            <tr>
                                <td>Cena netto</td>
                                <td>{selectedProduct.cenaNetto} PLN</td>
                            </tr>
                            <tr>
                                <td>Okres gwaracji</td>
                                <td>{selectedProduct.okresGwarancji} miesięcy</td>
                            </tr>
                            </tbody>
                        </table>
                        <center>
                            <button className="btn btn-secondary" onClick={closeModal}>
                                Zamknij
                            </button>
                        </center>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Produkty;
