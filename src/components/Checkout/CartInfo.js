import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCart,
  updateCart,
  deleteFromCart,
  emptyCart
} from "./../../redux/cartReducer";
import bookImg from "./../../assets/rayNewBookImage.jpeg";
// import cdImg from "./../../assets/raynewImageCd.jpeg";
import cdImg from "./../../assets/rayCdsImage.JPG";
import { Link } from "react-router-dom";

export class CartInfo extends Component {
  constructor() {
    super();
    this.state = {
      edits: [],
      allFalse: [],
      animate: false
    };
  }
  componentDidMount() {
    this.setState({ edits: this.props.cart.map(e => false) });
  }
  dispatchUpdate = () => {
    this.props.updateCart(this.props.cart);
    this.setState({ edits: this.props.cart.map(e => false) });
  };
  changeQuantity = (operation, id) => {
    let { cart } = this.props;
    const index = cart.findIndex(e => e.product_id === id);
    let edits = this.state.edits;
    edits[index] = true;
    if (operation === "add") {
      if (+cart[index].quantity < 10) {
        +cart[index].quantity++;
      }
    } else {
      if (cart[index].quantity !== 1) {
        +cart[index].quantity--;
      }
    }
    this.setState({ edits: edits });
  };
  removeItem = (id, name) => {
    console.log(name);
    this.setState({ [name]: true });
    setTimeout(() => this.props.deleteFromCart(id), 1000);
  };
  render() {
    const cart = this.props.cart.map((e, i) => {
      console.log(this.state[e.product_name]);
      return (
        <div
          key={i}
          className={
            this.state[e.product_name]
              ? "product-container animate-removal"
              : "product-container"
          }
        >
          <section className="split-info left">
            <img src={e.product_id == 2 ? bookImg : cdImg} height="120px" />
          </section>
          <section className="split-info right">
            <h5 className="product-name">{e.product_name}</h5>
            <div className="quantity">
              <button
                className="btn-operations"
                onClick={() => this.changeQuantity("minus", e.product_id)}
              >
                <span>-</span>
              </button>
              <h6 className="quantity-input text-center">{+e.quantity || 1}</h6>

              <button
                className="btn-operations"
                onClick={() => this.changeQuantity("add", e.product_id)}
              >
                <span>+</span>
              </button>
            </div>
            <h6>FREE</h6>
            <button
              name={e.product_name}
              className={
                this.state.animate
                  ? "btn-condition warning animate-removal"
                  : "btn-condition warning"
              }
              onClick={event =>
                this.removeItem(e.product_id, event.target.name)
              }
            >
              REMOVE
            </button>
          </section>
        </div>
      );
    });
    return (
      <div className="cart-info">
        <h2 className="section-titles">Cart</h2>
        <header className="cart-list">
          <p>ITEM</p>
          <aside>
            <p>QUANTITY</p>
            <p>PRICE</p>
          </aside>
        </header>
        <div className="cart-border">{cart}</div>
        <Link to="/products">
          <button className="btn-primary auto-width">CONTINUE SHOPPING</button>
        </Link>
        {this.state.edits.includes(true) && (
          <button
            className="btn-condition lead"
            onClick={() => this.dispatchUpdate()}
          >
            UPDATE
          </button>
        )}
      </div>
    );
  }
}
export default connect(
  state => state.cartReducer,
  { getCart, updateCart, deleteFromCart, emptyCart }
)(CartInfo);
