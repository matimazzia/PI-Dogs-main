import React from "react";
import { Link } from "react-router-dom";
import "./principal.css";
import image from "../../img/perritos.png"
const Principal = () => {
  return (
    <div className="conteiner">
      <img  className="imagen" src={image} alt="perritos not found"></img>
      <div className= "text">
        <h1 className="titul">Bienvenidos a Perrunia</h1>
        <h3 className="subtitulo">
           ¡Vas a poder encontrar todas las razas existentes e incluso agregar la tuya!
        </h3>
      </div>
        <div>
          <Link to="/home">
            <button className="boton">COMENZAR</button>
          </Link>
        </div>
    </div>
  );
};

export default Principal;