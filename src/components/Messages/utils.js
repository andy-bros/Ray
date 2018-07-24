import React, { Component } from "react";
import axios from "axios";

class Messages extends Component {
  state = {
    messages: [],
    currMessage: []
  };
  componentDidMount() {
    axios.get(`/api/getmessages?section=${this.props.type}`).then(res => {
      console.log(res.data);
      this.setState({ messages: res.data });
    });
  }
  render() {
    let { messages } = this.state;
    console.log("messages", messages);
    let mappedMessages = messages.map((e, i) => (
      //
      //DO NOT TOUCH I AM COMING BACK TO  THIS

      <h1 key={i} onClick={() => this.setState()}>
        {e.Title}
      </h1>
    ));
    return (
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
    );
  }
}
export default Messages;
