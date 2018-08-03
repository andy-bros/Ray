import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToCart } from "./../../redux/cartReducer";
import bookImg from "./../../assets/rayNewBookImage.jpeg";
import cdImg from "./../../assets/raynewImageCd.jpeg";

class Products extends React.Component {
  state = {
    messages: []
  };
  async componentDidMount() {
    const response = await axios.get("/api/products").catch(console.error);
    this.setState({ messages: response.data });
  }
  addToCartFn(e) {
    console.log(e.quantity);
    console.log(this.props.cart);
    let product = this.props.cart.find(
      item => item.product_id === e.product_id
    );
    if (!product || product.quantity < 10) this.props.addToCart(e);
  }
  render() {
    console.log(this.props.cart);
    let { messages } = this.state;
    let newMessages = messages.map(e => {
      return (
        <div key={e.product_id} className="product-in-store">
          <img src={e.product_id == 1 ? cdImg : bookImg} height="390px" />
          <h2 className="text-center heavy">{e.product_name}</h2>
          <h4>FREE</h4>
          <button className="btn-primary" onClick={() => this.addToCartFn(e)}>
            Add To Cart
          </button>
        </div>
      );
    });
    return (
      <div>
        <h2 className="section-titles">PRODUCTS</h2>
        <div className="products-container">{newMessages}</div>
      </div>
    );
  }
}
export default connect(
  state => state.cartReducer,
  { addToCart }
)(Products);
