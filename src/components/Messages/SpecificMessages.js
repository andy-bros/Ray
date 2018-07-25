import React, { Component } from "react";
import axios from "axios";

class SpecificMessages extends Component {
  state = {
    messages: []
  };
  componentDidMount() {
    let key = Object.keys(this.props.match.params)[0];
    key = key[0].toUpperCase() + key.slice(1);
    console.log(key);
    axios.get(`/api/getmessages?section=${key}`).then(res => {
      console.log(
        res.data[
          this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
        ].messages
      );
      this.setState({
        messages:
          key === "Courses"
            ? res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].messages.slice(1)
            : res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].messages
      });
    });
  }
  render() {
    let { messages } = this.state;
    let newMessages = messages.map((e, i) => {
      console.log(e.Key);
      let str = e.Key;

      str = str
        .split("/")[2]
        .split("_")
        .splice(1)
        .join(" ");
      //   console.log(str.slice(0, str.length - 4));
      console.log("bahaha", str);
      return (
        <div
          key={e.Key}
          style={{
            display: "flex",
            width: "100vw",
            height: "50px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <a href={`https://s3.amazonaws.com/raymp3s/${e.Key}`}>
            {str.slice(0, str.length - 4)}
          </a>
        </div>
      );
    });
    return <div>{newMessages}</div>;
  }
}
export default SpecificMessages;
