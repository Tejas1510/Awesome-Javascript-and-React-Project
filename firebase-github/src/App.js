import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter,Switch,Route,Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import"react-toastify/dist/ReactToastify.min.css"
import firebase from "firebase/app"
import "firebase/auth"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';

import { UserContext } from './context/UserContext';
import Home from './pages/Home';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar'
import firebaseConfig from './config/firebaseConfig';

//init firebase
firebase.initializeApp(firebaseConfig)

const App = ()=>{

  const [user, setUser] = useState(null)

    return(
        <BrowserRouter>
          <ToastContainer />
          <UserContext.Provider value={{user,setUser}}>
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="*" component={PageNotFound} />
            </Switch>
            <Footer></Footer>
          </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App


