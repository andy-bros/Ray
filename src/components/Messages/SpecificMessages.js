import React, { Component, Fragment } from "react";
import axios from "axios";
import LoadingDots from "../animations/Loading";
import { Link } from "react-router-dom";

class SpecificMessages extends Component {
  state = {
    messages: []
  };
  componentDidMount() {
    console.log(this.props.match.params);
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
    let newMessages = messages.map((e, i, a) => {
      console.log("eeee", a[i + 1]);
      let notesFlag = false;
      let nextArr = [];
      let str = e.Key.split("/")[2];
      if (
        i !== a.length - 1 &&
        str.slice(str.length - 3, str.length) === "mp3" &&
        a[i + 1].Key.split("/")[2].slice(str.length - 3, str.length) === "pdf"
      ) {
        notesFlag = true;
        nextArr = messages.splice(i + 1, 1);
      } else {
        notesFlag = false;
      }
      // let date = `${this.findMonth(str.slice(7, 9))} ${str.slice(
      //   9,
      //   11
      // )}, ${str.slice(3, 7)}`;
      // console.log("THIS IS THE", date);
      str = str
        .split("_")
        .splice(1)
        .join(" ");
      console.log("bahaha", notesFlag);

      return (
        //
        //
        //check to see if the current index is an mp3 or pdf
        //if the current is mp3, and the next index is ===
        //as well as a pdf, then splice it out, and put a
        //box next to the current that links them to notes
        //
        //
        // <div key={e.Key} className="each-individual-message-title">
        <Link
          key={e.Key}
          to={`/${Object.keys(this.props.match.params)[0]}/${
            this.props.match.params[Object.keys(this.props.match.params)[0]]
          }/${
            // this.props.match.params[Object.keys(this.props.match.params)[0]]
            i
          }/?pdf=${notesFlag}`}
        >
          <div className="each-individual-message-title">
            <h2> {str.slice(0, str.length - 4)}</h2>
          </div>
        </Link>
      );
    });
    return (
      <div
        className="each-individual-message-holder
      "
      >
        {messages.length !== 0 ? <div>{newMessages}</div> : <LoadingDots />}
      </div>
    );
  }
}
export default SpecificMessages;
