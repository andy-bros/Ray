import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingDots from "../animations/Loading";

class Messages extends Component {
  state = {
    messages: [],
    currMessage: []
  };
  componentDidMount() {
    console.log(this.props.type);
    axios.get(`/api/getmessages?section=${this.props.type}`).then(res => {
      console.log(res.data);
      this.setState({ messages: res.data });
    });
  }
  render() {
    let { messages } = this.state;

    console.log("messages", messages);
    let mappedMessages = messages.map((e, i) => {
      console.log(e);
      return (
        <div key={i}>
          <Link
            to={`/${this.props.type[0].toLowerCase() +
              this.props.type.slice(1)}/${i}`}
          >
            {/* test */}
            <h1>
              {e.Title.slice(this.props.type.length + 1, e.Title.length - 1)}
            </h1>
          </Link>
        </div>
      );
    });
    return (
      <Fragment>
        {messages.length !== 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            {mappedMessages}
          </div>
        ) : (
          <LoadingDots />
        )}
      </Fragment>
    );
  }
}
export default Messages;
