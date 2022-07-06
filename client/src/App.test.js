import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Route, BrowserRouter } from "react-router-dom";
import Principal from './views/principal/principal';

configure({ adapter: new Adapter() });

describe('<Launch />', () => {

    describe('Estructura', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<BrowserRouter><Route><Principal/></Route></BrowserRouter>);
        })
        it('Renderiza un <button>', () => {
            const butn = `<a href="/home"><button class="boton">COMENZAR</button></a>`
            expect(wrapper.html().includes(butn)).toBe(true)
        })
        it('Renderiza un <img>', () => {
          const image = `<img class="imagen" src="perritos.png" alt="perritos not found">`
          expect(wrapper.html().includes(image)).toBe(true);
        })
        it('Renderiza textos', () => {
          const text = `<h1 class="titul">Bienvenidos a Perrunia</h1><h3 class="subtitulo">¡Vas a poder encontrar todas las razas existentes e incluso agregar la tuya!</h3>`
          expect(wrapper.html().includes(text)).toBe(true);
        })

        })})
