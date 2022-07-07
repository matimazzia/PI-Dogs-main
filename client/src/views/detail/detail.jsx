import React from "react";
import CardDetail from "../../components/cardDetail/CarDetail";
import { cleanDetail, getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./detail.css"
import LoadingSpinner from "../../components/loading/LoadingSpinner";

function Detail(){
    const {id} = useParams()
    console.log(id)
    const dispatch = useDispatch();
    const Dog = useSelector((state) => state.detail);
    useEffect(() => {
    dispatch(getDetail(id));
    return function clean(){
        dispatch(cleanDetail())
    }
  }, [dispatch,id]);

    var dog= Dog
    console.log(dog)
    console.log(Dog)
    return(
        <div className="contenedorcd">
        <div className="contenedornv">
        <Link to="/home">
        <button className="navis3">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M511.8 287.6L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L416 100.7V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6L511.8 287.6z" /></svg>
            </div>
        </button>
        </Link>
        <Link to="/form">
        <button className="navis4">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="perro"><path d="M332.7 19.85C334.6 8.395 344.5 0 356.1 0C363.6 0 370.6 3.52 375.1 9.502L392 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H552C565.3 64 576 74.75 576 88V112C576 156.2 540.2 192 496 192H426.7L421.6 222.5L309.6 158.5L332.7 19.85zM448 64C439.2 64 432 71.16 432 80C432 88.84 439.2 96 448 96C456.8 96 464 88.84 464 80C464 71.16 456.8 64 448 64zM416 256.1V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V364.8C295.1 377.1 268.8 384 240 384C211.2 384 184 377.1 160 364.8V480C160 497.7 145.7 512 128 512H96C78.33 512 64 497.7 64 480V249.8C35.23 238.9 12.64 214.5 4.836 183.3L.9558 167.8C-3.331 150.6 7.094 133.2 24.24 128.1C41.38 124.7 58.76 135.1 63.05 152.2L66.93 167.8C70.49 182 83.29 191.1 97.97 191.1H303.8L416 256.1z"/></svg>
            </div>
        </button>
        </Link>
        </div>
        {dog.name ? 
        <CardDetail
            name={dog.name}
            weight={dog.weight?.metric? dog.weight.metric :`${dog.weightMin !== NaN && dog.weightMin? dog.weightMin : ""} - ${dog.weightMax !== NaN && dog.weightMax? dog.weightMax : "" }`}
            image={dog.image? dog.image: (dog.reference_image_id ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` : '' )}
            temperament={dog.temperament ? dog.temperament : dog.temperaments}
            height={dog.height?.metric ? dog.height.metric : dog.height}
            life_span={dog.life_span.toString().includes('years')? dog.life_span.replace('years', "años"): (`${dog.life_span} años`) }
            /> : <LoadingSpinner/>}
        </div>

    )

}


export default Detail;