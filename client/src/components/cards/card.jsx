import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

const Card = ({ id,name, weight, image, temperament }) => {

  return (
    <Link to={`/dogs/${id}`}> 
      <div className="card">
        <img src={image}alt="HOLA" className="imgcard"></img>
        <div className="textblock">
        <h2 className="titulo">{name}</h2>
        <h4 className="otros">{weight?`${weight} KG`: "No especificado"}</h4>
        <h4 className="otros">{function (temperament) {
                if (typeof (temperament) === 'string') {
                    return temperament;
                }
                if (Array.isArray(temperament)) {
                    let temps = temperament.map(el => el.name);
                    return temps.join(', ');
                }
            }(temperament)}</h4>
        </div>
      </div>
    </Link>
  );
};
//hola
export default Card;