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
    futureDiceValues: [],
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
  }

  _updateNumberOfDice = event => {
    this.setState({ numberOfDice: event.target.value });
    this.setState({ futureDiceValues: [] }, this._growDiceArray);
  };

  _growDiceArray() {
    this._generateRolls(this.state.futureDiceValues, []);
    shuffleArray(this.state.futureDiceValues);
  }

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
            onChange={this._updateNumberOfDice}
          >
            {[...Array(8).keys()].map(n => {
              const number = (n + 1).toString();
              return <option value={number}>{number}</option>;
            })}
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
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  inputBoxContainer: {
    alignSelf: "center",
    display: "flex",
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
  },
  inputBox: {
    alignSelf: "center",
    borderRadius: 25,
    flexGrow: 1,
    height: 25,
    marginLeft: 16,
    marginRight: 16,
    width: 100,
  },
  diceContainer: {
    alignSelf: "center",
    display: "flex",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    background: "black",
    color: "white",
  },
  dice: {
    borderColor: "coral",
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 2,
    display: "flex",
    flexDirection: "column",
    height: 50,
    justifyContent: "center",
    marginLeft: 4,
    marginTop: 4,
    textAlign: "center",
    width: 50,
  },
  button: {
    borderColor: "grey",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidht: 1,
    fontSize: 20,
    height: 30,
    paddingTop: 10,
    paddingTottom: 10,
    textAlign: "center",
    width: 200,
  },
};

export default App;
