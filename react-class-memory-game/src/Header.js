import React from "react";
import "./Header.css";
import PropTypes from 'prop-types';
/* Has callback on link in header to restart game; can be functional */
function Header({ newGame }) {
  return (
    <header>
      <nav>
        <ul>
          <li >
            <h1>Memory Game</h1>
          </li>
          <li onClick={newGame}>
            <button>New game</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
Header.propTypes = {
  newGame:PropTypes.func.isRequired
}

export default Header;
