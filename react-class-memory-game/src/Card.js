import React from "react";
import "./Card.css";
import PropTypes from 'prop-types';

function Card(props) {
  const { color, id, card_state, cardClick } = props;
  let classString = "card ";
  let styles = {};
  if (card_state === 2) {
    classString += "solved";
    styles.background = color;
  } else if (card_state === 1) {
    classString += "picked";
    styles.background = color;
  } else if (card_state === 0) {
    classString += "hidden";
    styles.background = "black";
  }
  return (
    <div
      onClick={cardClick}
      id={id}
      className={classString}
      style={styles}
    ></div>
  );
}

Card.propTypes = {
  color: PropTypes.string,
  id: PropTypes.number,
  card_state: PropTypes.number,
  cardClick: PropTypes.func
}

export default Card;
