import "./App.css";
import {Route } from "react-router-dom";
import Principal from "./views/principal/principal";
import Home from "./views/home/home"
import Form from "./views/form/form";
import Detail from "./views/detail/detail";
// import Createdog from "./views/form";
// import Detail from "./views/detail";


function App() {
  return (
      <div className="App">
          <Route exact path="/" ><Principal/></Route>
          <Route path= "/home"><Home/></Route>
          <Route path="/form"><Form></Form></Route>
          <Route path="/dogs/:id"><Detail/></Route>
      </div>
  );
}

export default App;
