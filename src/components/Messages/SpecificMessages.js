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
      let date = `${this.findMonth(str.slice(7, 9))} ${str.slice(
        9,
        11
      )}, ${str.slice(3, 7)}`;
      console.log("THIS IS THE", date);
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
        <Link
          to={`/${Object.keys(this.props.match.params)[0]}/${
            this.props.match.params[Object.keys(this.props.match.params)[0]]
          }/${
            // this.props.match.params[Object.keys(this.props.match.params)[0]]
            i
          }/?pdf=${notesFlag}`}
        >
          <div key={e.Key}>
            {e.Key}
            {/* {notesFlag && (
            <a href={`https://s3.amazonaws.com/raymp3s/${nextArr.Key}`}>
              click here for notes
            </a>
          )} */}

            {/* <audio src={`https://s3.amazonaws.com/raymp3s/${e.Key}`}>
            <p>{date}</p>
            {str.slice(0, str.length - 4)}
          </audio> */}
            {/*do not touch this page i am working on it*/}
            {/* <audio controls>
            <source
              src={`https://s3.amazonaws.com/raymp3s/${e.Key}`}
              type="audio/mpeg"
            /> */}
            {/* <p>{date}</p>
            {str.slice(0, str.length - 4)} */}
            {/* </audio> */}
          </div>
        </Link>
      );
    });
    return (
      <Fragment>
        dogs
        {messages.length !== 0 ? <div>{newMessages}</div> : <LoadingDots />}
      </Fragment>
    );
  }
}
export default SpecificMessages;
