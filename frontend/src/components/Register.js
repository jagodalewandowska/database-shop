import React, { useState } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";

const Register = () => {
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const errors = {};

    if (!registerUser.username.trim()) {
      errors.username = "Nazwa użytkownika jest wymagana";
    } else if (registerUser.username.length < 4) {
      errors.username = "Login nie może być krótszy niż 4 znaki";
    } else if (registerUser.username.length > 20) {
      errors.username = "Login nie może być dłuszy niż 20 znaków";
    }

    if (!registerUser.email.trim()) {
      errors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(registerUser.email)) {
      errors.email = "Nieprawidłowy format emaila";
    }

    if (!registerUser.password.trim()) {
      errors.password = "Hasło jest wymagane";
    }

    if (!registerUser.password.trim()) {
      errors.password = "Imię jest wymagane";
    } else if (registerUser.password.length > 64) {
      errors.password = "Hasło nie może być dłuższe niż 64 znaków";
    } else if (registerUser.password.length < 4) {
      errors.password = "Hasło nie może być krótsze niż 4 znaki";
    }

    if (!registerUser.firstName.trim()) {
      errors.firstName = "Imię jest wymagane";
    } else if (registerUser.firstName.length > 20) {
      errors.firstName = "Imię nie może być dłuższe niż 20 znaków";
    } else if (registerUser.firstName.length < 4) {
      errors.firstName = "Imię nie może być krótsze niż 4 znaki";
    }

    if (!registerUser.lastName.trim()) {
      errors.lastName = "Nazwisko jest wymagane";
    } else if (registerUser.lastName.length > 30) {
      errors.lastName = "Nazwisko nie może być dłuższe niż 30 znaków";
    } else if (registerUser.lastName.length < 2) {
      errors.lastName = "Nazwisko nie może być krótsze niż 2 znaki";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post(
            "http://localhost:8082/api/users",
            registerUser,
            { headers: authHeader() }
        );

        setRegisterUser({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          roles: "",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
        setSuccessMessage("Zarejestrowano pomyślnie");
      } catch (error) {
        alert(
            "Użytkownik istnieje w bazie danych. Sprawdź nazwę użytkownika lub email."
        );
      }
    }
  };

  return (
      <div className="col-md-12">
        <div className="card card-container">
          {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
                value={registerUser.email}
                onChange={handleRegisterInputChange}
                required
            />
            {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Nazwa użytkownika</label>
              <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  name="username"
                  value={registerUser.username}
                  onChange={handleRegisterInputChange}
                  required
              />
              {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={registerUser.password}
                  onChange={handleRegisterInputChange}
                  required
              />
              {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Imię</label>
              <input
                  type="text"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  name="firstName"
                  value={registerUser.firstName}
                  onChange={handleRegisterInputChange}
                  required
              />
              {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nazwisko</label>
              <input
                  type="text"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  name="lastName"
                  value={registerUser.lastName}
                  onChange={handleRegisterInputChange}
                  required
              />
              {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-red btn-block">
                Zarejestruj się
              </button>
            </div>

          </form>
        </div>
      </div>
  );
};

export default Register;
