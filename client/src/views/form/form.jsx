import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import './form.css'


function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'El perro tiene que tener un nombre';
    }
    else if (input.name.length > 30) {
        errors.name = 'Nombre muy largo';
    }
    else if (!input.height) {
        errors.height = 'La altura es requerida';
    }
    else if (isNaN(parseInt(input.height))) {
        errors.height = 'Espera un numero';
    }

    else if (!input.weightMin) {
        errors.weightMin = 'Peso minimo requerido!';
    }
    else if (isNaN(parseInt(input.weightMin))) {
        errors.weightMin = 'Espera un numero';
    }
    else if (input.weightMin <= 0) {
        errors.weightMin = 'El peso tiene que ser mayor o diferente a 0';
    }
    else if (!input.weightMax) {
        errors.weightMax = 'Peso maximo requerido!';
    }
    else if (isNaN(parseInt(input.weightMax))) {
        errors.weightMax = 'Espera un numero';
    }
    else if (parseInt(input.weightMax) <= parseInt(input.weightMin)) {
        errors.weightMax = 'El peso maximo tiene que ser mayor que el peso minimo';
    }

    else if (!input.life_span) {
        errors.life_span = 'Expectativa de vida requerida';
    }
    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'Espera un numero';
    }
    else if (input.life_span > 50) {
        errors.life_span = 'La expecativa de vida no puede ser mayor a 50 años';
    }
    else if (input.life_span <= 0) {
        errors.life_span = 'La expecativa de vida debe ser mayor a 0 años';
    }

    return errors;
}

export default function Form() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        height: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));

        console.log(input)
    }

    function handleSelect(e) {
        var encontrado=false;
        input.temperaments.map(element => {
            if(element.name === e.target.value) {
                encontrado = true;
            }
        })
        if(!encontrado){
            var idTemp = "";
            allTemperaments.map(temp => {
                if(e.target.value === temp.name){
                    idTemp = temp.id
                }
                })
                setInput({
                    ...input,
                    temperaments: [...input.temperaments, {name: e.target.value, id: idTemp}]
                });
                console.log(input);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(errors);
        if (!Object.getOwnPropertyNames(errors).length && input.name  && input.height && input.weightMin && input.weightMax && input.life_span && input.temperaments.length) {
            var tempIds = []
            input.temperaments.map(el => tempIds.push(el.id))
            dispatch(postDog({
                name: input.name,
                height: input.height,
                weightMin: input.weightMin,
                weightMax: input.weightMax,
                life_span: input.life_span,
                image: input.image,
                pkt: tempIds,
            }));
            alert('Tu perro fue creado con exito! 👏');
            setInput({
                name: '',
                height: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                image: '',
                temperaments: [],
            });
            history.push('/home');
        } else {
            alert('No hemos podido crear tu perro, corrobora la informacion enviada')
        }
    }

    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp.name !== el)
        })
    }

    return (
        <div className='divCreate'>
            <Link to='/home'><button className='buttonHome'>INICIO</button></Link>
            <h1 className='title'> Crea tu perro 🐶</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="disv">
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} placeholder="Nombre:"  className="int"/>
                    {errors.name && (
                        <p className='error'><strong>{errors.name}</strong></p>
                    )}
                </div>
                <div className="disv">
                    <input type='text' value={input.height} name='height' onChange={e => handleChange(e)} placeholder="Alto:" className="int"/>
                    {errors.height && (
                        <p className='error'><strong>{errors.height}</strong></p>
                    )}
                </div>
                <div className="disv">
                    <input type='text' value={input.weightMin} name='weightMin' onChange={e => handleChange(e)} placeholder="Peso Minimo:"className="int"/>
                    {errors.weightMin && (
                        <p className='error'><strong>{errors.weightMin}</strong></p>
                    )}
                </div>
                <div className="disv">
                    <input type='text' value={input.weightMax} name='weightMax' onChange={e => handleChange(e)} placeholder="Peso Maximo:" className="int"/>
                    {errors.weightMax && (
                        <p className='error'><strong>{errors.weightMax}</strong></p>
                    )}
                </div>
                <div className="disv">
                    <input type='text' value={input.life_span} name='life_span' onChange={e => handleChange(e)} placeholder="Expectativa de vida:" className="int"/>
                    {errors.life_span && (
                        <p className='error'><strong>{errors.life_span}</strong></p>
                    )}
                </div>
                <div className="disv">
                    <input type='text' value={input.image} name='image' onChange={e => handleChange(e)} placeholder="Url de imagen:" className="int"/>
                </div>
                <div className="content-select2">
                    <select onChange={e =>{
                        handleSelect(e)
                        e.target.options[0].selected=true;
                    }} >
                        <option value='selected' hidden >Temperaments</option>
                        {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>
                    <div className="boxcontenttemp">
                    {input.temperaments.map(el => {
                        return (
                            
                                <div className='cube' key={el.id}>
                                    <div className="cubecontent">
                                        <p className="pselect"><strong>{el.name}</strong></p>
                                        <button className="bselect" onClick={() => handleDeleteTemperament(el.name)}>X</button>
                                    </div>
                                </div>
                            
                        )
                    })}
                    </div>
                </div>
                <button type='submit' className='boop' ><strong>CREAR</strong></button>

            </form>

        </div>
    )
}