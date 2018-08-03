import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToCart } from "./../../redux/cartReducer";

class Products extends React.Component {
  state = {
    messages: []
  };
  async componentDidMount() {
    const response = await axios.get("/api/products").catch(console.error);
    this.setState({ messages: response.data });
  }
  render() {
    console.log(this.props.cart);
    let { messages } = this.state;
    let newMessages = messages.map(e => {
      return (
        <div key={e.product_id}>
          <h2>{e.product_name}</h2>
          <h4>{e.product_desciption}</h4>
          <button onClick={() => this.props.addToCart(e)}>Add To Cart</button>
        </div>
      );
    });
    return <div>{newMessages}</div>;
  }
}
export default connect(
  state => state.cartReducer,
  { addToCart }
)(Products);
