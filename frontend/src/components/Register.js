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
    lastName: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/api/users", registerUser, { headers: authHeader() });
      console.log(registerUser);
      setRegisterUser({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        roles: ""
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSuccessMessage("Zarejestrowano pomyślnie");
    } catch (error) {
      alert("Użytkownik istnieje w bazie danych. Sprawdź nazwę użytkownika lub email.")
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
                className="form-control"
                name="email"
                value={registerUser.email}
                onChange={handleRegisterInputChange}
                required
            />
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Nazwa użytkownika</label>
              <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={registerUser.username}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={registerUser.password}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Imię</label>
              <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={registerUser.firstName}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nazwisko</label>
              <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={registerUser.lastName}
                  onChange={handleRegisterInputChange}
                  required
              />
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
