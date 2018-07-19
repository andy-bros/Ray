import React, { Component } from "react";
import { RadioBtn, InputCredentials } from "./Customs";

class GiftAmount extends Component {
  constructor() {
    super();
    this.state = {
      defaultAmounts: ["25", "50", "100", "200", "500"],
      selected: "",
      checked: "one-time"
    };
    this.buttonInput = React.createRef();
  }

  handleSelection = ({ event, value, i }) => {
    // console.log([event.target.id]);
    // if ([event.target.id][0] !== "money-input") {
    //   let btn = document.querySelectorAll(".button-primary");
    //   btn.forEach(e => (e.style.backgroundColor = "#dddddd"));
    //   btn[i].style.backgroundColor = "#0099e5";
    // }
    this.setState({
      [event.target.name]: value
    });
  };
  render() {
    let mappedAmounts = this.state.defaultAmounts.map((el, i) => {
      return (
        <button
          key={i}
          className="button-primary boxShadow"
          name="selected"
          // style={{ background: "#ddd" }}
          onClick={event => this.handleSelection({ event, value: el, i })}
          ref={this.buttonInput}
        >
          ${el}
        </button>
      );
    });
    return (
      <div>
        <h2 className="bottom-border title">Gift Amount</h2>
        <div className="gift-form">
          <ul className="donation-amount">{mappedAmounts}</ul>
          <section className="frequency-amount">
            <div className="ctrl-inputs dollar-amount">
              <span>$</span>
              <input
                value={this.state.selected}
                name="selected"
                id="money-input"
                placeholder="amount"
                onChange={event =>
                  this.handleSelection({ event, value: event.target.value })
                }
              />
            </div>
            <div className="ctrl-inputs">
              <RadioBtn
                value="one-time"
                label="One Time"
                handleSelection={this.handleSelection}
                checked={this.state.checked}
              />
              <RadioBtn
                value="monthly"
                label="Monthly"
                handleSelection={this.handleSelection}
                checked={this.state.checked}
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

class Credentials extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2 className="bottom-border title">Credientials</h2>
        <div className="credentials-input">
          <InputCredentials title="First Name" />
        </div>
      </div>
    );
  }
}

class DonateForm extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <GiftAmount />
        <Credentials />
      </div>
    );
  }
}
export default DonateForm;
