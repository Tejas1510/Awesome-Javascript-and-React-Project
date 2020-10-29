import React, { Component } from "react";
import "./GameBoard.css";
import Header from "./Header";
import Card from "./Card";
import Timer from './Timer';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.idCounter = -1;
    this.TOTAL_HEX_COLORS = 16777215;
    this.UNIQUE_COLORS = 8;
    this.CARD_STATE = {
      HIDDEN: 0,
      PICKED: 1,
      SOLVED: 2
    };
    //Set up a timer for high scores
    this.timer =
      this.colorsArr = this.randomColors(8);
    let cardsArr = this.colorsArr.map((elem, idx) => ({
      id: ++this.idCounter,
      color: elem,
      card_state: this.CARD_STATE.HIDDEN //Change me
    }));
    cardsArr = this.shuffleCards(cardsArr);
    this.state = {
      cards: [...cardsArr],
      picked: [],
      score: 0,
      clickable: true,
      gameOver: false
    };
    this.newGame = this.newGame.bind(this);
    this.cardClick = this.cardClick.bind(this);
  }

  /* Returns an array with 2 copies of
  each  number unique colors you want in the array
  e.g 10 unique = 20 item arr
  */
  randomColors(numUnique) {
    let arr = [];
    while (numUnique) {
      let color =
        "#" + Math.floor(Math.random() * this.TOTAL_HEX_COLORS).toString(16);
      arr.push(color);
      arr.push(color);
      numUnique--;
    }
    return arr;
  }
  startTimer() {
    const id = setInterval(() => {
      console.log(`One second passed`);
    }, 1000)
    return id;
  }
  /*Using implementation of Fisher-yates for more even spread of random
  values vs using Math.random() and Array.sort() */
  shuffleCards(copy) {
    for (let i = copy.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }


  newGame() {
    this.setState({ gameOver: true }, () => {
      let colorsArr = this.randomColors(this.UNIQUE_COLORS);
      let cardsArr = colorsArr.map((elem, idx) => ({
        id: ++this.idCounter,
        color: elem,
        card_state: this.CARD_STATE.HIDDEN
      }));
      cardsArr = this.shuffleCards(cardsArr);
      this.setState({ cards: cardsArr, picked: [], score: 0, gameOver: false });
      console.log("Created new game");
    })

  }

  cardClick(e) {
    let curid = Number(e.target.id);
    let copy = this.state.cards.slice();
    let timing = 800; //ms
    let newClick = false;
    let pickCopy = [...this.state.picked];
    let cardRef = copy[copy.findIndex(elem => elem.id === curid)];
    if (cardRef.card_state === this.CARD_STATE.HIDDEN && this.state.clickable) {
      cardRef.card_state = this.CARD_STATE.PICKED;
      pickCopy.push(cardRef);
      console.log(pickCopy);
    }
    if (pickCopy.length <= 1) {
      newClick = true;
    }
    this.setState({ cards: copy, picked: pickCopy, clickable: newClick }, () => {
      //Guaranteed to run after setState completes

      setTimeout(() => {
        let ref1, ref2;
        let copy2 = [...this.state.cards];
        if (this.state.picked.length === 2) {
          ref1 =
            copy2[copy2.findIndex(elem => elem.id === this.state.picked[0].id)];

          ref2 =
            copy2[copy2.findIndex(elem => elem.id === this.state.picked[1].id)];
          this.checkMatchingCard(ref1, ref2);
          this.setState({ picked: [], cards: copy2, clickable: true });
        } else {
          this.setState({
            picked: [...this.state.picked],
            cards: copy2,
            clickable: true
          });
        }
        // else if(){
        //   ref1.card_state = this.CARD_STATE.HIDDEN;
        // }
      }, timing);
    });
  }

  checkMatchingCard(cardA, cardB) {
    if (cardA.color !== cardB.color && cardA.id !== cardB.id) {
      cardA.card_state = this.CARD_STATE.HIDDEN;
      cardB.card_state = this.CARD_STATE.HIDDEN;
    } else if (cardA.color === cardB.color && cardA.id !== cardB.id) {
      cardA.card_state = this.CARD_STATE.SOLVED;
      cardB.card_state = this.CARD_STATE.SOLVED;
      const newScore = this.state.score + 1;
      const isGameOver = newScore === 8 ? true : false;

      this.setState((prev) => ({ score: prev.score++, gameOver: isGameOver }));

    }
  }
  render() {
    const { cards } = this.state;
    return (
      <section>
        <Header newGame={this.newGame} />
        <article className='gameboard'>
          {cards.map((elem, idx) => (
            <Card
              key={elem.id}
              color={elem.color}
              id={elem.id}
              card_state={elem.card_state}
              cardClick={this.cardClick}
            />
          ))}
        </article>
        <Timer gameOver={this.state.gameOver} />
      </section>
    );
  }
}

export default GameBoard;
