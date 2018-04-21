// @flow
import React, { Component } from "react";
const synth = window.speechSynthesis;

type Props = {};
type State = {
  numberOfDice: Number,
  diceValues: Array<number>,
};
class App extends Component<Props, State> {
  state = {
    numberOfDice: 1,
    diceValues: [],
  };

  _onClick = () => {
    const diceValues = [];
    for (var i = 0; i < this.state.numberOfDice; i++) {
      diceValues.push(this._giveARandomNumber());
    }
    this.setState({ diceValues });

    synth.speak(
      new SpeechSynthesisUtterance(diceValues.reduce((acc, cur) => acc + cur)),
    );
  };

  _updateNumberOfDice = event => {
    this.setState({ numberOfDice: event.target.value });
  };
  _giveARandomNumber = () => 1 + Math.floor(Math.random() * 6);

  render() {
    const { diceValues, numberOfDice } = this.state;
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1>Roll Dice!</h1>
        </header>
        <div style={styles.inputBoxContainer}>
          <span>Number of dice </span>
          <input
            style={styles.inputBox}
            value={numberOfDice}
            onChange={this._updateNumberOfDice}
          />
          <Button onClick={this._onClick} />
        </div>
        <div style={styles.diceContainer}>
          {diceValues.map(num => <Dice number={num} />)}
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
    alignContent: "center",
  },
  inputBoxContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  inputBox: {
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 25,
    height: 25,
    flexGrow: 1,
  },
  diceContainer: {
    display: "flex",
    marginRight: 20,
    marginLeft: 20,
    flexWrap: "wrap",
  },
  header: {
    background: "black",
    color: "white",
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
    marginTop: 4,
  },
  button: {
    textAlign: "center",
    width: 50,
    height: 20,
    borderColor: "grey",
    borderWidht: 1,
    borderStyle: "solid",
  },
};

export default App;
