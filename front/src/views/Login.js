import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { fetchDestinations } from "../actions/destinationActions";
import "../style/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      password: null,
      logged: null,
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
    var name = this.state.name;
    var email = this.state.email;
    var password = this.state.password;
    if (name && email && password) {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          name: name,
          email: email,
          password: password,
        })
        .then((response) => {
          this.setState({ name: null });
          this.setState({ email: null });
          this.setState({ password: null });
        });
    }
  }

  logIn(event) {
    event.preventDefault();
    var email = this.state.email;
    var password = this.state.password;
    if (email && password) {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("userId", response.data.userId);
          this.setState({ email: null });
          this.setState({ password: null });
          this.props.fetchDestinations();
          setTimeout(() => {
            this.setState({ logged: true });
          }, 1000);
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
            onBlur={this.handleChangeName}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@hotmail.com"
            onBlur={this.handleChangeEmail}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            onBlur={this.handleChangePassword}
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
            onBlur={this.handleChangeEmail}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            onBlur={this.handleChangePassword}
          />
          <button type="submit">Connexion</button>
        </form>
        {this.state.logged && <Navigate to="/home" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDestinations: () => dispatch(fetchDestinations()),
});

export default connect(null, mapDispatchToProps)(Login);
