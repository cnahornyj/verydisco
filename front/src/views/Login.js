import React, { Component } from 'react';
import axios from 'axios';
import '../style/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: null,  
          email: null,
          password: null
      }

      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.signUp = this.signUp.bind(this);
    }

    render() {
        return (
            <div className='LogAndSign'>
                <div className='Signup'>
                    <form onSubmit={this.signUp.bind(this)}>
                        <label>Nom</label>
                        <input type="text" name="name" placeholder='John' onBlur={this.handleChangeName}/>
                        <label>Email</label>
                        <input type="email" name="email" placeholder='john@hotmail.com' onBlur={this.handleChangeEmail}/>
                        <label>Mot de passe</label>
                        <input type="password" name="password" onBlur={this.handleChangePassword}/>
                        <button type="submit">S'enregistrer</button>
                    </form>
                </div>
                <div className="Login">
                    <label>Email</label>
                    <input type="email" name="email" placeholder='john@hotmail.com'/>
                    <label>Mot de passe</label>
                    <input type="password" name="password"/>
                    <button type="submit">Connexion</button>
                </div>
            </div>
        );
    }

    handleChangeName(event) {
        this.setState({name: null});
    }

    handleChangeEmail(event) {
        const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
        console.log(event.target.value);
        if (emailRegex.test(event.target.value)){
            this.setState({email: event.target.value});
        } else {
            alert("Le format de votre email est invalide");
        } 
    }

    handleChangePassword(event){
        const passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        if(passwordRegex.test(event.target.value)){
            this.setState({password: event.target.value});
        } else {
            alert("Votre mot de passe doit comporter un minimum de 8 caractères dont au moins une minuscule, une majuscule, un chiffre et un caractère spécial");
        }
    }

    signUp(event){
        event.preventDefault();
        var name = this.state.name;
        var email = this.state.email;
        var password = this.state.password;
        if(name && email && password){
            axios.post("http://localhost:3000/api/auth/signup", {
            name: name,    
            email: email,
            password: password
            })
            .then((response) => {
            console.log(response);
            this.setState({name: null});
            this.setState({email: null});
            this.setState({password: null});
            });
        }
    }
}

export default Login;