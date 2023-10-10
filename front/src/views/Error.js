import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Error = () => {
  return (
    <div className="errorPage">
        <Navbar />
        <section className="errorSection">
          <p className="errorCode">404</p>
          <p className="errorMsg">Oups! La page que vous demandez n'existe pas.</p>
          <Link to={"/form"} className="redirection">Retourner sur la page d'accueil</Link>
        </section>
      </div>
  );
}

export default Error;