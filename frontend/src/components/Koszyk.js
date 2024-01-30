import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

const Koszyk = () => {
    const [koszykItems, setKoszykItems] = useState([]);
    const [producentName, setProducentName] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:8082/api/koszyk/all", { headers: authHeader() })
            .then((response) => {
                const storage = JSON.parse(localStorage.getItem("user"));
                const currentUserId = storage.id;
                const filteredItems = filterKoszykItemsByUserId(response.data, currentUserId);
                setKoszykItems(filteredItems);
            })
            .catch((error) => {
                console.error("Error fetching koszyk items:", error);
            });

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

    const filterKoszykItemsByUserId = (items, userId) => {
        return items.filter(item => item.idKlienta === userId);
    };

    const getProductNameById = (idProd) => {
        const product = products.find(product => product.idProd=== idProd);
        return product ? product.nazwa : "Unknown Product";
    };

    const calculateTotalPrice = () => {
        return koszykItems.reduce((total, item) => {
            return total + item.ilosc * item.cenaJednostkowa;
        }, 0);
    };

    return (
        <div className="container mt-5">
            <h3>Koszyk</h3>
            <div className="row">
                <div className="col-md-8">
                    {koszykItems.map((item) => (
                        <div key={`${item.idKlienta}-${item.idProd}`} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{getProductNameById(item.idProd)}</h5>
                                <p className="card-text">Ilość: {item.ilosc}</p>
                                <p className="card-text">Cena Jednostkowa: {item.cenaJednostkowa}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-4">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <h5 className="card-title">Podsumowanie koszyka</h5>
                            <p>Ilość produktów w koszyku: {koszykItems.length}</p>
                            <p>Suma: {calculateTotalPrice()} zł</p>
                            <button className="btn btn-light" disabled>Przejdź do podsumowania</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Koszyk;
