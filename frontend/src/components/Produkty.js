import React, { useState, useEffect } from "react";
import axios from 'axios';
import authHeader from "../services/auth-header";

const Produkty = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/products", { headers: authHeader() });
                setProducts(response.data);
            } catch (error) {
                console.error(`Error fetching products: ${error}`);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h3>List of Products</h3>

            {products.length === 0 && <p>No products available.</p>}

            <div className="row">
                {products.map((product) => (
                    <div key={product.id_prod} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.nazwa}</h5>
                                <p className="card-text">Price: {product.cena_brutto} PLN</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Produkty;
