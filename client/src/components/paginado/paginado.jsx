import React from 'react';
import './paginado.css'
export default function Paginado({dogsPerPage, allDogs, paginado,currentPage}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i + 1);
    }
    var number = 1
    return (
        <nav className='pagin'>
            <ul className='paginado'>
            <li>
                    <button onClick={() => paginado(currentPage-1)}><strong>{"<"}</strong></button>
            </li>
            <li>
                    <button><strong>{currentPage}</strong></button>
            </li>
            <li>
                    <button onClick={() => paginado(currentPage+1)}><strong>{">"}</strong></button>
            </li>


                {/* {pageNumbers.length > 1 && 
                // pageNumbers.map(number => (
                //     <li key={number}>
                //         <button onClick={() => paginado(number)}><strong>{number}</strong></button>
                //     </li>
                // ))} */}
            </ul>
        </nav>
    )
}