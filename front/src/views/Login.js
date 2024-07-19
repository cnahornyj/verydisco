import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { loginSuccess, loginFailure } from "../actions/authActions";
import "../style/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      logged: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeEmail(event) {
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    if (emailRegex.test(event.target.value)) {
      this.setState({ email: event.target.value });
    } else {
      alert("Le format de votre email est invalide");
    }
  }

  handleChangePassword(event) {
    const passwordRegex = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    if (passwordRegex.test(event.target.value)) {
      this.setState({ password: event.target.value });
    } else {
      alert(
        "Votre mot de passe doit comporter un minimum de 8 caractères dont au moins une minuscule, une majuscule, un chiffre et un caractère spécial"
      );
    }
  }

  signUp(event) {
    event.preventDefault();
    const { name, email, password } = this.state;
    if (name && email && password) {
      axios
        .post("http://localhost:3000/api/auth/signup", { name, email, password })
        .then((response) => {
          this.setState({ name: '', email: '', password: '' });
        });
    }
  }

  logIn(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      axios
        .post("http://localhost:3000/api/auth/login", { email, password })
        .then((response) => {
          const { token, userId } = response.data;
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("userId", userId);
          this.setState({ email: '', password: '' });
          this.props.loginSuccess(token, userId);
          setTimeout(() => {
            this.setState({ logged: true });
          }, 1000);
        })
        .catch(error => {
          this.props.loginFailure(error.message);
        });
    }
  }

  render() {
    return (
      <div className="LogAndSign">
        <form onSubmit={this.signUp} className="Signup">
          <div>
            <h2>Je crée mon compte</h2>
            <hr />
          </div>
          <label>Nom</label>
          <input
            type="text"
            name="name"
            placeholder="John"
            onChange={this.handleChangeName}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@hotmail.com"
            onChange={this.handleChangeEmail}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChangePassword}
          />
          <button type="submit">S'enregistrer</button>
        </form>
        <form onSubmit={this.logIn} className="Login">
          <div>
            <h2>Je me connecte</h2>
            <hr />
          </div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@hotmail.com"
            onChange={this.handleChangeEmail}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChangePassword}
          />
          <button type="submit">Connexion</button>
        </form>
        {this.state.logged && <Navigate to="/home" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (token, userId) => dispatch(loginSuccess(token, userId)),
  loginFailure: (error) => dispatch(loginFailure(error)),
});

export default connect(null, mapDispatchToProps)(Login);
