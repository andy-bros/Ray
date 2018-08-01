import React, { Component } from "react";
import { Credentials } from "./../Donate/DonateForm";
import { SubmitButton } from "./../Donate/Customs";
class Checkout extends Component {
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
      inputFields: [
        { label: "First Name" },
        { label: "Last Name" },
        { label: "Email Address" },
        { label: "Street Address 1" },
        { label: "Street Address 2", notRequired: true },
        { label: "Phone Number", notRequired: true },
        { label: "City" },
        { label: "Zip Code" }
      ]
    };
  }
  handleChange = ({ event, value }) => {
    console.log(value);
    [event.target.name][0] !== "checked" && event.preventDefault();
    this.setState({
      [event.target.name]: value
    });
  };
  submitForm = () => {
    console.log("submitting...", this.state);
  };
  render() {
    return (
      <form
        className="donation-page"
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <Credentials
          values={this.state}
          inputFields={this.state.inputFields}
          handleChange={this.handleChange}
          selectBox={true}
          purpose="Shipping"
        />
        <SubmitButton text="Submit Order" />
      </form>
    );
  }
}
export default Checkout;
