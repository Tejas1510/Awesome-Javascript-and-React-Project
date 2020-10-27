import React from 'react';
import './App.css';
import Navbar from './components/NavBar/nav.jsx';
import Blog_body from './components/Blog/Blog_body';
import Placement_body from './components/Placement/Placement_body';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contest_page from './components/Contest/Contest_page';
import Mainpage from './components/MainPage/Mainpage';
import Main_Swiper from './components/MainPage/Main_swiper';
import GotoTop from './components/goUp/GotoTop';
import Admin from './components/Admin/Admin';
import Subscribe from './components/MainPage/Subscribe';

function App() {

  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/blogs">
            <Navbar color="#242424" position="" />
            <br />
            <br />
            <br />
            <Blog_body />
            <GotoTop idd="blog_body"/>
          </Route>

          <Route path="/contest">
            <Navbar color="#242424" position="" />
            <br />
            <br />
            <br />
            <Contest_page />
            <GotoTop idd="contest_body" />
          </Route>

          <Route path="/placement">
            <Navbar color="#242424" position="" />
            <br />
            <br />
            <br />
            <Placement_body />
            <GotoTop idd="placement_body" />
          </Route>

          <Route path="/subscribe">
            <Navbar color="#242424" position="" />
            <Subscribe />
           
          </Route>

          <Route path="/info">
            <Navbar color="#242424" position="fixed-top" />
            <Main_Swiper />
          </Route>
          
          <Route path="/admin">
            <Navbar color="#242424" position="" />
            <br />
            <br />
            <br />
            <Admin />
            <GotoTop idd="admin_body" />
          </Route>

          <Route path="/">
            <Navbar color="#efefef" position="fixed-top" />
            <Mainpage />
          </Route>

          

        </Switch>

      </Router>
    </div>


  );
}

export default App;
