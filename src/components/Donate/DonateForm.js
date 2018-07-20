import React, { Component } from "react";
import { RadioBtn, InputCredentials, SelectBox } from "./Customs";
class GiftAmount extends Component {
  constructor() {
    super();
    this.state = {
      defaultAmounts: ["25", "50", "100", "200", "500"],
      frequency: [
        { value: "one-time", label: "One Time" },
        { value: "monthly", label: "Monthly" }
      ]
    };
  }
  render() {
    let mappedAmounts = this.state.defaultAmounts.map((el, i) => (
      <button
        key={i}
        className={true ? "btn-primary" : "btn-primary"}
        name="selected"
        onClick={event => this.props.handleChange({ event, value: el })}
        ref={this.buttonInput}
      >
        ${el}
      </button>
    ));
    let mappedFrequencies = this.state.frequency.map(({ value, label }, i) => (
      <RadioBtn
        key={i}
        value={value}
        label={label}
        handleChange={this.props.handleChange}
        checked={this.props.checked}
      />
    ));
    return (
      <div>
        <h2 className="bottom-border title">Gift Amount</h2>
        <div className="gift-form">
          <ul className="donation-amount">{mappedAmounts}</ul>
          <section className="frequency-amount">
            <div className="ctrl-inputs dollar-amount">
              <span>$</span>
              <input
                value={this.props.selected}
                name="selected"
                id="money-input"
                placeholder="amount"
                onChange={event =>
                  this.props.handleChange({ event, value: event.target.value })
                }
              />
            </div>
            <div className="ctrl-inputs">{mappedFrequencies}</div>
          </section>
        </div>
      </div>
    );
  }
}
class Credentials extends Component {
  constructor() {
    super();
    this.state = {
      inputFields: [
        "First Name",
        "Last Name",
        "Email Address",
        "Street Address 1",
        "Street Address 2",
        "City",
        "State",
        "Zip Code"
      ]
    };
  }
  toCamelCase = str => {
    let word = str.split(" ");
    word[0] = word[0].toLowerCase();
    return word.join("");
  };

  render() {
    let mappedInputs = this.state.inputFields.map((e, i) => {
      let camelCase = this.toCamelCase(e);
      if (camelCase == "state") {
        return <div>hello</div>;
      }
      return (
        <InputCredentials
          name={camelCase}
          key={i}
          title={e}
          handleChange={this.props.handleChange}
        />
      );
    });
    return (
      <div className="credentials-container">
        <h2 className="bottom-border title">Credientials</h2>
        <div className="credentials-input">
          {mappedInputs}
          <SelectBox />
        </div>
        {/* <SelectBox /> */}
      </div>
    );
  }
}
class DonateForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
      selected: "",
      checked: "one-time"
    };
  }
  handleChange = ({ event, value }) => {
    this.setState({
      [event.target.name]: value
    });
  };
  render() {
    return (
      <div>
        <GiftAmount
          handleChange={this.handleChange}
          selected={this.state.selected}
          checked={this.state.checked}
        />
        <Credentials handleChange={this.handleChange} />
      </div>
    );
  }
}
export default DonateForm;
