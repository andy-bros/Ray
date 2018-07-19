import React, { Component } from "react";

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
    console.log("here is the value", value);
    this.setState({ [event.target.id]: value });
  };
  render() {
    console.log(this.state.selected);
    let mappedAmounts = this.state.defaultAmounts.map((el, i) => {
      return (
        <button
          key={i}
          className="button-primary boxShadow"
          id="selected"
          onClick={event => this.handleSelection({ event, value: el })}
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
                placeholder="amount"
                // className="ctrl-inputs-dollar-amount"
                onChange={event =>
                  this.handleSelection({ event, value: event.target.value })
                }
              />
            </div>
            <div className="ctrl-inputs">
              <aside>
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
              </aside>
              <aside>
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
              </aside>
            </div>
          </section>
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
      </div>
    );
  }
}
export default DonateForm;
