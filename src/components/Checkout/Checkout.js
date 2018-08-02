import React, { Component } from "react";
import { Credentials } from "./../Donate/DonateForm";
import { SubmitButton } from "./../Donate/Customs";
import { connect } from "react-redux";
import {
  getCart,
  updateCart,
  deleteFromCart,
  emptyCart
} from "./../../redux/cartReducer";
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
    console.log(value);
    this.setState({
      [event.target.name]: value
    });
  };
  submitForm = event => {
    console.log("submitting...", this.state);
    this.props.emptyCart();
    this.props.history.push("/");
  };
  componentDidMount() {
    this.props.getCart();
  }
  handleQuantity = (id, val) => {
    let { cart } = this.props;
    const i = cart.findIndex(e => e.product_id == id);
    cart[i].quantity = val;
  };
  dispatchUpdate = () => {
    this.props.updateCart(this.props.cart);
  };
  render() {
    const cart = this.props.cart.map((e, i) => {
      return (
        <div key={i}>
          <h5>{e.product_name}</h5>
          <input
            type="number"
            min="1"
            max="5"
            defaultValue={e.quantity || 1}
            name={e.product_name}
            onChange={event =>
              this.handleQuantity(e.product_id, event.target.value)
            }
          />
          <h6>quantity: {e.quantity || 1}</h6>
          <button onClick={() => this.props.deleteFromCart(e.product_id)}>
            REMOVE FROM CART
          </button>
        </div>
      );
    });
    return (
      <div className="donation-page">
        {cart}
        <button onClick={this.dispatchUpdate}>UPDATE CART</button>
        <Credentials
          values={this.state}
          inputFields={this.state.inputFields}
          handleChange={this.handleChange}
          selectBox={true}
          purpose="Shipping"
        />
        <SubmitButton text="Submit Order" submitForm={this.submitForm} />
      </div>
    );
  }
}
export default connect(
  state => state.cartReducer,
  { getCart, updateCart, deleteFromCart, emptyCart }
)(Checkout);
