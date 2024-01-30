import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cart from './components/img/cart1.png';

const Navbar = ({ currentUser, logOut, showModeratorBoard, showAdminBoard }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <Link to={"/"} className="navbar-brand">
                Sklep
            </Link>
            <div className="navbar-nav mr-auto">
                {showModeratorBoard && (
                    <li className="nav-item">
                        <Link to={"/mod"} className="nav-link">
                            Panel moderatora
                        </Link>
                    </li>
                )}

                {/*{currentUser && (*/}
                {/*    <li className="nav-item">*/}
                {/*        <Link to={"/user"} className="nav-link">*/}
                {/*            Panel użytkownika*/}
                {/*        </Link>*/}
                {/*    </li>*/}
                {/*)}*/}

                {showAdminBoard && (
                    <li className="nav-item">
                        <Link to={"/producenci"} className="nav-link">
                            Producenci
                        </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <li className="nav-item">
                        <Link to={"/klienci"} className="nav-link">
                            Klienci
                        </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <li className="nav-item">
                        <Link to={"/zamowienia"} className="nav-link">
                            Zamówienia
                        </Link>
                    </li>
                )}

                {currentUser && (
                    <div className="nav-item">
                        <Link to={"/koszyk"} className="nav-link">
                            Koszyk
                        </Link>
                    </div>
                )}

            </div>

            <div className="navbar-nav ml-auto">

                {currentUser ? (
                    <div
                        className="dropdown"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className="dropdown-toggle" onMouseEnter={toggleDropdown}>
                            <div className="profile-info">
                                <img
                                    src={currentUser.profileImage || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                                    alt="profile-img"
                                    className="profile-info-img"
                                />
                                <span>{currentUser.username}</span>
                            </div>
                        </button>
                        {isDropdownVisible && (
                            <div className="dropdown-menu">
                                <Link to={"/profile"} className="nav-link">
                                    Profil
                                </Link>
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    Wyloguj się
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Zaloguj się
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Zarejestruj się
                            </Link>
                        </li>
                    </div>
                )}


            </div>
        </nav>
    );
};

export default Navbar;
