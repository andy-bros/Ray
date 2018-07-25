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
  findMonth = num => {
    if (num === "01") return "January";
    else if (num === "02") return "February";
    else if (num === "03") return "March";
    else if (num === "04") return "April";
    else if (num === "05") return "May";
    else if (num === "06") return "June";
    else if (num === "07") return "July";
    else if (num === "08") return "August";
    else if (num === "09") return "September";
    else if (num === "10") return "October";
    else if (num === "11") return "November";
    else if (num === "12") return "December";
  };
  render() {
    let { messages } = this.state;
    let newMessages = messages.map((e, i) => {
      // console.log("eeeeee", e);
      let str = e.Key.split("/")[2];
      let date = `${this.findMonth(str.slice(7, 9))} ${str.slice(
        9,
        11
      )}, ${str.slice(3, 7)}`;
      console.log("THIS IS THE", date);
      str = str
        .split("_")
        .splice(1)
        .join(" ");
      //   console.log(str.slice(0, str.length - 4));
      console.log("bahaha", str);
      return (
        //
        //
        //check to see if the current index is an mp3 or pdf
        //if the current is mp3, and the next index is ===
        //as well as a pdf, then splice it out, and put a
        //box next to the current that links them to notes
        //
        //
        <div
          key={e.Key}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100vw",
            height: "50px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <a href={`https://s3.amazonaws.com/raymp3s/${e.Key}`}>
            <p>{date}</p>
            {str.slice(0, str.length - 4)}
          </a>
        </div>
      );
    });
    return <div>{newMessages}</div>;
  }
}
export default SpecificMessages;
