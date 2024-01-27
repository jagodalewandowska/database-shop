import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from 'axios';
import authHeader from "../services/auth-header";
import Modal from "react-modal";

Modal.setAppElement('#root'); // Set the app element here

const BoardAdmin = () => {
    const [content, setContent] = useState("");
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: ""
    });
    const [editingUser, setEditingUser] = useState(null);
    const [sortField, setSortField] = useState("lastName");
    const [sortOrder, setSortOrder] = useState("asc");
    const handleAddModalOpen = () => {
        setAddModalOpen(true);
    };

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const sortedUsers = [...users].sort((a, b) => {
        const valueA = a[sortField].toLowerCase();
        const valueB = b[sortField].toLowerCase();

        if (valueA < valueB) {
            return sortOrder === "asc" ? -1 : 1;
        } else if (valueA > valueB) {
            return sortOrder === "asc" ? 1 : -1;
        } else {
            return 0;
        }
    });

    const handleAddModalClose = () => {
        setAddModalOpen(false);
        setNewUser({
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            postalCode: "",
            phoneNumber: "",
        });
    };

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8082/api/users", { headers: authHeader() });
            const filteredUsers = response.data.filter(user => user.username.toLowerCase() !== 'admin');
            setUsers(filteredUsers);
            console.log(filteredUsers);
        } catch (error) {
            console.error(`Error fetching users: ${error}`);
        }
    };

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );

        getUsers();
    }, []);


    return (
        <div className="container">
            {/*<h3 className="mb-4">Zarządzaj kandydatami</h3>*/}

            {users.length === 0 && (
                <p>Brak użytkowników</p>
            )}

            <br></br>

            {users.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">
                                Numer
                            </th>
                            <th scope="col" onClick={() => handleSort("firstName")}>
                                Imię {sortField === "firstName" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th scope="col" onClick={() => handleSort("lastName")}>
                                Nazwisko {sortField === "lastName" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th scope="col" onClick={() => handleSort("username")}>
                                Nazwa użytkownika {sortField === "username" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th scope="col" onClick={() => handleSort("email")}>
                                Adres e-mail {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th scope="col" onClick={() => handleSort("address")}>
                                Adres {sortField === "address" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th scope="col" onClick={() => handleSort("city")}>
                                Miasto {sortField === "city" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th scope="col" onClick={() => handleSort("postalCode")}>
                                Kod pocztowy {sortField === "postalCode" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                            <th scope="col" onClick={() => handleSort("phoneNumber")}>
                                Numer telefonu {sortField === "phoneNumber" && (sortOrder === "asc" ? "▲" : "▼")}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedUsers.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.city}</td>
                                <td>{user.postalCode}</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    );
};

export default Produkty;
