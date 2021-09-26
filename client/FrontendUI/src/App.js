import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useEffect} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HOME from "./components/Home";



const Routing = () => {
  const history = useHistory();
  // const {state,dispatch}=useContext(UserContext);
  useEffect(()=>{
     const user =JSON.parse( localStorage.getItem("user"));
     if(user){
        // dispatch({type:"USER",payload:user})
        history.push('/home');
     }else{
        history.push('/');

     }
  },[])

  return (

    <Switch>
       <Route exact path="/">
          <LandingPage />
       </Route>
       <Route path="/signin">
          <LandingPage />
       </Route>
       <Route path="/signup">
          <LandingPage />
       </Route>
       <Route path="/home">
          <HOME />
       </Route>
    </Switch>


 )
}


function App() {
  return (
    <div className="App">
       <BrowserRouter>
            <Routing />
         </BrowserRouter>
    </div>
  );
}

export default App;
