import React, { Component, Fragment } from "react";
import { Credentials } from "./../Donate/DonateForm";
import { SubmitButton } from "./../Donate/Customs";
import { connect } from "react-redux";
import {
  getCart,
  updateCart,
  deleteFromCart,
  emptyCart
} from "./../../redux/cartReducer";
import CartInfo from "./CartInfo";
import EmptyCartInfo from "./EmptyCartInfo";
import axios from "axios";
import swal from "sweetalert2";
class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      inputFields: [
        { label: "First Name" },
        { label: "Last Name" },
        { label: "Email Address" },
        { label: "Street Address" },
        { label: "Street Address 2", notRequired: true },
        { label: "Phone Number", notRequired: true },
        { label: "City" },
        { label: "Zip Code" }
      ]
    };
  }
  handleChange = ({ event, value }) => {
    console.log(this.state);
    [event.target.name][0] !== "checked" && event.preventDefault();
    console.log(value);
    this.setState({
      [event.target.name]: value
    });
  };
  submitForm = event => {
    console.log("submitting...", this.state);

    axios
      .post("/api/send-email", { ...this.state })
      .then(() => {
        swal({
          type: "success",
          title: "Your order has been placed.",
          text: "Check the email you provided for a confirmation receipt."
        }).then(() => {
          this.props.emptyCart();
          this.props.history.push("/");
        });
      })
      .catch(err => {
        swal({
          type: "error",
          title: "Invalid credentials",
          text: "Check inputs again."
        });
      });
  };
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    let { cart } = this.props;
    return (
      <Fragment>
        {cart.length ? (
          <div className="donation-page">
            <CartInfo />
            <Credentials
              values={this.state}
              inputFields={this.state.inputFields}
              handleChange={this.handleChange}
              selectBox={true}
              purpose="Shipping"
            />
            <SubmitButton text="Submit Order" submitForm={this.submitForm} />
          </div>
        ) : (
          <EmptyCartInfo />
        )}
      </Fragment>
    );
  }
}
export default connect(
  state => state.cartReducer,
  { getCart, updateCart, deleteFromCart, emptyCart }
)(Checkout);
