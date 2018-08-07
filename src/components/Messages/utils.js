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
    let { type } = this.props;

    let mappedMessages = messages.map((e, i) => {
      let visibility = "hidden";
      setTimeout(() => (visibility = "visible"), i);
      console.log(e);
      return (
        <Link
          key={i}
          to={`/${this.props.type[0].toLowerCase() +
            this.props.type.slice(1)}/${i}`}
        >
          <div className="ea-message-title" style={{ visibility: {} }}>
            <h1>
              {e.Title.slice(this.props.type.length + 1, e.Title.length - 1)
                .split("_")
                .join(" ")}
            </h1>
          </div>
        </Link>
      );
    });
    return (
      <Fragment>
        {messages.length !== 0 ? (
          <div className="message-titles">{mappedMessages}</div>
        ) : (
          <LoadingDots />
        )}
      </Fragment>
    );
  }
}
export default Messages;
