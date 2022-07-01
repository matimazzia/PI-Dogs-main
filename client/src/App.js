import "./App.css";
import {Route } from "react-router-dom";
import Principal from "./views/principal/principal";
import Home from "./views/home/home"
// import Createdog from "./views/form";
// import Detail from "./views/detail";


function App() {
  return (
      <div className="App">
          <Route exact path="/" ><Principal/></Route>
          <Route path= "/home"><Home/></Route>
      </div>
  );
}

export default App;
