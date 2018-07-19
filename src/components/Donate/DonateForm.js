import React, { Component } from "react";
// import "./../../App.css";

class GiftAmount extends Component {
  constructor() {
    super();
    this.state = {
      defaultAmounts: ["25", "50", "100", "200", "500"],
      selected: "",
      checked: "one-time"
    };
  }

  handleSelection = ({ event, value }) => {
    this.setState({ [event.target.id]: value });
  };
  render() {
    let mappedAmounts = this.state.defaultAmounts.map((el, i) => {
      return (
        <li
          key={i}
          id="selected"
          onClick={event => this.handleSelection({ event, value: el })}
        >
          {el}
        </li>
      );
    });
    return (
      <form>
        <h2 className="bottom-border">Gift Amount</h2>
        <div className="gift-form">
          <ul className="donation-amount">{mappedAmounts}</ul>
          <section className="frequency-amount">
            <div>
              <span>$</span>
              <input defaultValue={this.state.selected} placeholder="amount" />
            </div>
            <div>
              <input
                type="radio"
                id="checked"
                value="monthly"
                checked={this.state.checked == "monthly"}
                onChange={event =>
                  this.handleSelection({ event, value: event.target.value })
                }
              />
              <label>Monthly</label>
              <input
                type="radio"
                id="checked"
                value="one-time"
                checked={this.state.checked == "one-time"}
                onChange={event =>
                  this.handleSelection({ event, value: event.target.value })
                }
              />
              <label>One Time</label>
            </div>
          </section>
        </div>
      </form>
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
        <h1 className="donate-form">Donate form</h1>
        <GiftAmount />
      </div>
    );
  }
}
export default DonateForm;
