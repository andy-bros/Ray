import React, { Component } from "react";
import {
  RadioBtn,
  InputCredentials,
  SelectBox,
  SubmitButton,
  Card
} from "./Customs";
import { states } from "./data";
import assets from "./../../assets/data";
import { CardElement, Elements, injectStripe } from "react-stripe-elements";
import axios from "axios";
//////////////////////
//___GIFT_AMOUNT___///
//////////////////////
class GiftAmount extends Component {
  constructor() {
    super();
    this.state = {
      defaultAmounts: ["25", "50", "100", "200", "500"],
      frequency: [
        { value: "one-time", label: "One Time" },
        { value: "monthly", label: "Monthly" }
      ],
      currentBtn: ""
    };
  }
  render() {
    let mappedAmounts = this.state.defaultAmounts.map((el, i) => (
      <button
        key={i}
        className={this.props.selected == el ? "btn-selected" : "btn-primary"}
        name="selected"
        onClick={event => {
          this.setState({ currentBtn: el });
          this.props.handleChange({ event, value: el });
        }}
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

//////////////////////
//___CREDENTIALS___///
//////////////////////
class Credentials extends Component {
  constructor() {
    super();
    this.state = {
      inputFields: [
        { label: "First Name" },
        { label: "Last Name" },
        { label: "Email Address" },
        { label: "Street Address 1" },
        { label: "Street Address 2", notRequired: true },
        { label: "Phone Number", notRequired: true },
        { label: "City" },
        { label: "Zip Code" }
      ],
      states: ["Alabama", "Alaska"]
    };
  }
  toCamelCase = ({ label }) => {
    let word = label.split(" ");
    word[0] = word[0].toLowerCase();
    return word.join("");
  };

  render() {
    const { handleChange, values } = this.props;
    let mappedInputs = this.state.inputFields.map((e, i) => {
      let camelCase = this.toCamelCase(e);
      return (
        <InputCredentials
          currentValue={values[camelCase]}
          name={camelCase}
          key={i}
          title={e}
          handleChange={handleChange}
        />
      );
    });
    return (
      <div className="credentials-container">
        <h2 className="bottom-border title">Billing Information</h2>
        <div className="credentials-input">
          {mappedInputs}
          <SelectBox
            selection={states}
            handleChange={this.props.handleChange}
          />
        </div>
      </div>
    );
  }
}
//////////////////////
//___DONATE_FORM___///
//////////////////////
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
    [event.target.name][0] !== "checked" && event.preventDefault();
    this.setState({
      [event.target.name]: value
    });
  };
  submitForm = () => {
    // console.log("SUBMITTING FORM...", this.state);
    /*ALL THE INFO YOU NEED FROM 
    THE USER IS STORED ON STATE.
    TAKE WHAT YOU NEED IN ORDER 
    TO CONFIRM PAYMENT.*/

    this.props.stripe
      .createToken({ name: "Name" })
      .then(res =>
        axios.post("/charge", {
          token: res.token.id,
          amount: this.state.selected
        })
      )
      .catch(() => console.log("error"));
    // console.log(token);
  };
  render() {
    console.log("HERERERERE", this.props);
    return (
      <form
        className="donation-page"
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <Card text={assets.cardText} img={assets.donationPic} />

        <GiftAmount
          handleChange={this.handleChange}
          selected={this.state.selected}
          checked={this.state.checked}
        />

        <h2 className="bottom-border title">Payment Information</h2>
        <Card text={"Please fill out your credit card information"} />
        <div className="card-info sexy-input" style={{ padding: "12px" }}>
          {/* <Elements> */}
          <CardElement />
          {/* </Elements> */}
        </div>
        <Credentials values={this.state} handleChange={this.handleChange} />
        <SubmitButton />
        <br />
      </form>
    );
  }
}
const DonateForm1 = injectStripe(DonateForm);
class DonateForms extends Component {
  render() {
    return (
      <Elements>
        <DonateForm1 />
      </Elements>
    );
  }
}

export default DonateForms;
