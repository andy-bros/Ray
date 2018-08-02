import axios from "axios";
const initialState = {
  cart: []
};
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const UPDATE_CART = "UPDATE_CART";
const EMPTY_CART = "EMPTY_CART";

export function getCart() {
  return {
    type: GET_CART,
    payload: axios.get("/api/get-cart")
  };
}
export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: axios.post("/api/add-to-cart", { item })
  };
}
export function deleteFromCart(id) {
  return {
    type: DELETE_FROM_CART,
    payload: axios.delete(`/api/delete-from-cart/${id}`)
  };
}
export function updateCart(newCart) {
  console.log("fuck");
  return {
    type: UPDATE_CART,
    payload: axios.put("/api/update-cart", { newCart })
  };
}
export function emptyCart() {
  console.log("hello");
  return {
    type: EMPTY_CART,
    payload: axios.delete("/api/empty-cart")
  };
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case `${ADD_TO_CART}_FULFILLED`:
    case `${DELETE_FROM_CART}_FULFILLED`:
    case `${GET_CART}_FULFILLED`:
    case `${UPDATE_CART}_FULFILLED`:
    case `${EMPTY_CART}_FULFILLED`:
      console.log(action.payload);
      return { ...state, cart: action.payload.data };
    default:
      return state;
  }
}
