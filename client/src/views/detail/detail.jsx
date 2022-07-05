import React from "react";
import CardDetail from "../../components/cardDetail/CarDetail";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";

function Detail(){
    const {id} = useParams()
    console.log(id)
    const dispatch = useDispatch();
    const Dog = useSelector((state) => state.detail);
    useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch,id]);

    var dog= Dog
    console.log(dog)
    console.log(Dog)
    return(
        <div className="contenedorcd">
        <div className="contenedornv">
        <Nav/>
        </div>
        {dog.name? 
        <CardDetail
            name={dog.name}
            weight={dog.weight.metric? dog.weight.metric :`${dog.weightMin !== NaN && dog.weightMin? dog.weightMin : ""} - ${dog.weightMax !== NaN && dog.weightMax? dog.weightMax : "" }`}
            image={dog.image? dog.image: (dog.reference_image_id ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` : '' )}
            temperament={dog.temperament ? dog.temperament : dog.temperaments}
            height={(dog.height.metric? dog.height.metric : dog.height)}
            life_span={dog.life_span.toString().includes('years')? dog.life_span.replace('years', "años"): (`${dog.life_span} años`) }
            />:<></>}
        </div>

    )

}


export default Detail;