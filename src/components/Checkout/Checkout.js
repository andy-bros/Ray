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
import { Link } from "react-router-dom";
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
    [event.target.name][0] !== "checked" && event.preventDefault();
    this.setState({
      [event.target.name]: value
    });
  };
  submitForm = event => {
    // console.log("submitting...", this.state);
    let {
      city,
      emailAddress,
      firstName,
      lastName,
      zipCode,
      state,
      streetAddress
    } = this.state;
    let requiredVals = {
      city,
      emailAddress,
      firstName,
      lastName,
      zipCode,
      state,
      streetAddress
    };
    for (let key in requiredVals) {
      if (key === "emailAddress" && !/^\w+@\w+\.\w+$/.test(this.state[key])) {
        return swal({
          type: "error",
          title: "Invalid email address",
          text: "Try again."
        });
      }
      if (!this.state[key].length) {
        swal({
          type: "error",
          title: "Missing credentials",
          text: "Check inputs again."
        });
        return;
      }
    }
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
            <Link to="/donate">
              <div className="donation-alert-holder">
                <h5>
                  This website is a donation driven website. All teachings
                  within this site are open and free to the public. Any donation
                  is appreciated, and can be used as a tax deductable.
                </h5>
                <p>CLICK HERE TO DONATE</p>
              </div>
            </Link>
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
