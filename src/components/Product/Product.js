import React from "react";
import axios from "axios";

class Product extends React.Component {
  state = {
    messages: []
  };
  componentDidMount() {
    axios
      .get("/api/products")
      .then(res => {
        console.log(res.data);
        this.setState({ messages: res.data });
      })
      .catch(err => console.log(err));
    // axios
    //   .get("api/products")
    //   .then(res => console.log(res))
    //   .catch(() => console.log("error"));
  }
  addToCart = e => {
    axios
      .post("/api/addusercart", { items: e })
      .then(res => console.log(res))
      .catch(() => console.log("error"));
  };
  render() {
    let { messages } = this.state;
    let newMessages = messages.map(e => {
      return (
        <div key={e.product_id}>
          <h2>{e.product_name}</h2>
          <h4>{e.product_desciption}</h4>
          <button onClick={() => this.addToCart(e)}>Add To Cart</button>
        </div>
      );
    });
    return <div>{newMessages}</div>;
  }
}
export default Product;
