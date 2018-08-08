import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToCart } from "./../../redux/cartReducer";
import bookImg from "./../../assets/rayNewBookImage.jpeg";
import cdImg from "./../../assets/rayCdsImage.JPG";
import Component404 from "./../404/Component404";

class Product extends React.Component {
  state = {
    products: []
  };
  componentDidMount() {
    axios.get("/api/products").then(response => {
      console.log(response);
      this.setState({ products: response.data });
    });
  }
  addToCartFn(e) {
    let product = this.props.cart.find(
      item => item.product_id === e.product_id
    );
    if (!product || product.quantity < 10) this.props.addToCart(e);
  }
  render() {
    let item = this.state.products.find(
      product => product.product_id == this.props.match.params.id
    );
    return (
      <div>
        {item ? (
          <div key={item.product_id} className="each-product">
            <h2 className="section-titles">{item.product_name}</h2>
            <img src={item.product_id == 1 ? cdImg : bookImg} height="390px" />
            <figcaption className="description flex-column">
              <h2>Description</h2>
              <br />
              <p>{item.product_desciption}</p>
            </figcaption>
            <h4>FREE</h4>
            <button
              className="btn-primary"
              onClick={() => this.addToCartFn(item)}
            >
              Add To Cart
            </button>
          </div>
        ) : (
          <Component404
            title="ITEM NOT FOUND"
            path="/products"
            button="PRODUCTS"
          />
        )}
      </div>
    );
  }
}
export default connect(
  state => state.cartReducer,
  { addToCart }
)(Product);
