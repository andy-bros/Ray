import React, { Component } from "react";
import { Credentials } from "./../Donate/DonateForm";
import { SubmitButton } from "./../Donate/Customs";
import { connect } from "react-redux";
import { getCart } from "./../../redux/cartReducer";
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
    [event.target.name][0] !== "checked" && event.preventDefault();
    this.setState({
      [event.target.name]: value
    });
  };
  submitForm = () => {
    console.log("submitting...", this.state);
  };
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    console.log(this.props.cart);
    const cart = this.props.cart.map((e, i) => {
      console.log(e);
      return (
        <div key={i}>
          <h5>{e.product_name}</h5>
          {/* <input type="number" value={e.quantity || 1}> */}
          <h6>quantity: {e.quantity || 1}</h6>
          {/* </input> */}
        </div>
      );
    });
    return (
      <form
        className="donation-page"
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        {cart}
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
export default connect(
  state => state.cartReducer,
  { getCart }
)(Checkout);
