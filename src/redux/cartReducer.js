import axios from "axios";
const initialState = {
  cartAmount: 0,
  cart: []
};

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export function getCart() {
  return {
    type: GET_CART,
    payload: axios.get("/api/get-cart")
  };
}
export function addToCart(body) {
  return {
    type: ADD_TO_CART,
    payload: axios.post("/api/addusercart", body)
  };
}
export function removeFromCart(cart) {
  return {
    type: REMOVE_FROM_CART,
    payload: cart.remove
  };
}
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_CART}_FULFILLED`:
    case `${ADD_TO_CART}_FULFILLED`:
    case `${REMOVE_FROM_CART}_FULFILLED`:
      return { ...state, cart: action.payload.data };
    default:
      return state;
  }
}
