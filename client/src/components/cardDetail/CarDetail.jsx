import React from "react";
import perrotriste from "../../img/PERROTRISTE.jpg"
import "../cardDetail/CarDetail.css"
const CardDetail = ({name, weight, image, temperament,height,life_span}) => {

    return (
        <div className="detail">
          <img src={image? image : perrotriste }alt="not image" className="imgcd"></img>
          <div className="textblock2">
          <h1 className="titulode">{name}</h1>
          <h2 className="otros2">{height?`${height} CM`: "No especificado"}</h2>
          <h2 className="otros2">{weight?`${weight} KG`: "No especificado"}</h2>
          <h2 className="otros2">{life_span.includes('años')? life_span :`${life_span} años` }</h2>
          <h2 className="otros2">{function (temperament) {
                  if (typeof (temperament) === 'string') {
                      return temperament;
                  }
                  if (Array.isArray(temperament)) {
                      let temps = temperament.map(el => el.name);
                      return temps.join(', ');
                  }
              }(temperament)}</h2>
          </div>
        </div>
    );
  };
  
  export default CardDetail;