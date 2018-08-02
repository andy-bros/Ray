import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCart,
  updateCart,
  deleteFromCart,
  emptyCart
} from "./../../redux/cartReducer";
import bookImg from "./../../assets/rayNewBookImage.jpeg";
import cdImg from "./../../assets/raynewImageCd.jpeg";

export class CartInfo extends Component {
  constructor() {
    super();
    this.state = {};
  }
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
        <div key={i} className="product-container">
          <section className="split-info left">
            <img src={e.product_id == 2 ? cdImg : bookImg} height="100px" />
          </section>
          <section className="split-info right">
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
            <span className="quantity-converter">
              quantity: {e.quantity || 1}
            </span>
            <button onClick={this.dispatchUpdate}>UPDATE</button>
            <button onClick={() => this.props.deleteFromCart(e.product_id)}>
              REMOVE
            </button>
          </section>
        </div>
      );
    });
    return (
      <div className="cart-info">
        <h1>Cart</h1>
        {cart}
      </div>
    );
  }
}
export default connect(
  state => state.cartReducer,
  { getCart, updateCart, deleteFromCart, emptyCart }
)(CartInfo);
