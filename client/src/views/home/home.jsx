import React, { useState, useEffect } from "react";
import "../home/home.css"
import Card from "../../components/cards/card";
import { getDogs, getTemperaments, filterDogsByTemperament, filterDogsByOrigin, sortByWeight, sortByName } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Paginado from "../../components/paginado/paginado";


const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
  const allTemperaments = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch])
  // Paginado:
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const [_orden, setOrden] = useState('');

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  //---------------------------------------------------------------------



  function handleClick(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getDogs())
  }

  function handleFilterTemperaments(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByTemperament(e.target.value))
  }

  function handleFilterOrigin(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByOrigin(e.target.value))
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="contenedor">
      <div className='divNB'>
        <ul className='navbar'>
          <li className='content-select'>
            <select onChange={e => handleSortByName(e)}  >
              <option value='selected' hidden className='elementNB' >Sort breeds by name</option>
              <option value='asc'  >A - Z</option>
              <option value='desc' >Z - A</option>
            </select>
          </li>
          <li className='content-select' >
            <select onChange={e => handleSortByWeight(e)}  >
              <option value='selected' hidden>Sort by weight</option>
              <option value='asc'>Lighter to heavier</option>
              <option value='desc'>Heavier to lighter</option>
            </select>
          </li>
          <li className='content-select' >
            <select onChange={e => handleFilterTemperaments(e)}  >
              <option key={0} value='all'>All temperaments</option>
              {allTemperaments?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              }).map(el => {
                return (
                  <option key={el.id} value={el.name}>{el.name}</option>
                )
              })}
            </select>
          </li>
          <li className='content-select' >
            <select onChange={e => handleFilterOrigin(e)}  >
              <option value='all'>All breeds</option>
              <option value='api'>Existent breeds</option>
              <option value='created'>Created breeds</option>
            </select>
          </li>
        </ul>
      </div>
      {currentDogs.map((dog) => {
        return (
          <Card
            image={dog.image.url ? dog.image.url : dog.image}
            key={dog.id}
            id={dog.id}
            name={dog.name}
            temperament={dog.temperament ? dog.temperament : dog.temperaments}
            weight={`${dog.weightMin !== NaN && dog.weightMin? dog.weightMin : ""} - ${dog.weightMax !== NaN && dog.weightMax? dog.weightMax : "" }`}
          />
        )
      })}
      <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
    </div>

  );

}
export default Home