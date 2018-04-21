// @flow
import React, { Component } from "react";
const synth = window.speechSynthesis;

type Props = {};
type State = {
  numberOfDice: Number,
  diceValues: Array<number>,
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class App extends Component<Props, State> {
  state = {
    numberOfDice: 1,
    diceValues: [],
    futureDiceValues: []
  };
  _onClick = () => {
    if (this.state.futureDiceValues.length < 20) {
      this._growDiceArray();
    }
    const diceValues = this.state.futureDiceValues.shift();
    this.setState({ diceValues });
    synth.speak(
      new SpeechSynthesisUtterance(diceValues.reduce((acc, cur) => acc + cur)),
    );
  };

  _generateRolls(allRolls, currentRoll) {
    if (currentRoll.length >= this.state.numberOfDice) {
      allRolls.push(currentRoll);
      return;
    }
    for (var i = 1; i <= 6; i++) {
      let new_current = currentRoll.slice(0);
      new_current.push(i);
      this._generateRolls(allRolls, new_current);
    }
  };

  _updateNumberOfDice = event => {
    this.setState({ numberOfDice: event.target.value });
    this.setState({ futureDiceValues: [] }, this._growDiceArray);
  };

  _growDiceArray() {
    this._generateRolls(this.state.futureDiceValues, []);
    shuffleArray(this.state.futureDiceValues);
  };

  render() {
    const { diceValues, numberOfDice } = this.state;
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1>Roll Dice!</h1>
        </header>
        <div style={styles.inputBoxContainer}>
          <Button onClick={this._onClick} />
        </div>
        <div style={styles.diceContainer}>
          {diceValues.map(num => <Dice number={num} />)}
        </div>
        <div style={styles.inputBoxContainer}>
          <span>Number of dice </span>
          <select
            style={styles.inputBox}
            value={numberOfDice}
            onChange={this._updateNumberOfDice}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
          </select>
        </div>
      </div>
    );
  }
}

const Button = props => (
  <div style={styles.button} onClick={props.onClick}>
    Roll
  </div>
);

const Dice = props => <div style={styles.dice}>{props.number}</div>;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center"
  },
  inputBoxContainer: {
    display: "flex",
    alignSelf: "center",
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4
  },
  inputBox: {
    alignSelf: "center",
    width: 100,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 25,
    height: 25,
    flexGrow: 1
  },
  diceContainer: {
    display: "flex",
    alignSelf: "center",
    marginRight: 20,
    marginLeft: 20,
    flexWrap: "wrap"
  },
  header: {
    background: "black",
    color: "white"
  },
  dice: {
    textAlign: "center",
    alignSelf: "center",
    verticalAlign: "middle",
    lineHeight: "50px",
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    borderColor: "coral",
    borderWidth: "2px",
    borderStyle: "solid",
    marginLeft: 4,
    marginTop: 4
  },
  button: {
    textAlign: "center",
    fontSize: 20,
    width: 200,
    height: 30,
    paddingTop: 10,
    paddingTottom: 10,
    borderRadius: 10,
    borderColor: "grey",
    borderWidht: 1,
    borderStyle: "solid"
  }
};

export default App;
