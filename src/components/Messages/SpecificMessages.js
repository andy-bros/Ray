import React, { Component, Fragment } from "react";
import axios from "axios";
import LoadingDots from "../animations/Loading";
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

class SpecificMessages extends Component {
  state = {
    messages: [],
    title: ""
  };
  componentDidMount() {
    let key = Object.keys(this.props.match.params)[0];
    key = key[0].toUpperCase() + key.slice(1);
    axios.get(`/api/getmessages?section=${key}`).then(res => {
      this.setState({
        title:
          key === "Courses"
            ? res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].Title.slice(
                8,
                res.data[
                  this.props.match.params[
                    key[0].toLocaleLowerCase() + key.slice(1)
                  ]
                ].Title.length - 1
              )
            : res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].Title.slice(
                9,
                res.data[
                  this.props.match.params[
                    key[0].toLocaleLowerCase() + key.slice(1)
                  ]
                ].Title.length - 1
              ),
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
    let { messages, title } = this.state;
    let newMessages = messages.map((e, i, a) => {
      let notesFlag = false;
      // let nextArr = [];
      let str = e.Key.split("/")[2];
      if (
        i !== a.length - 1 &&
        str.includes("mp3") &&
        a[i + 1].Key.split("/")[2].includes("pdf")
        // str.slice(str.length - 3, str.length) === "mp3" &&
        // a[i + 1].Key.split("/")[2].slice(str.length - 3, str.length) === "pdf"
      ) {
        str = str
          .split("_")
          .splice(1)
          .join(" ");
        notesFlag = true;
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
            {/* <div className="each-individual-message-title"> */}
            <div className="ea-message-title">
              <h1> {str.slice(0, str.length - 4)}</h1>
            </div>
          </Link>
        );
      } else if (
        i !== a.length - 1 &&
        str.includes("mp3") &&
        !a[i + 1].Key.split("/")[2].includes("pdf")
      ) {
        str = str
          .split("_")
          .splice(1)
          .join(" ");
        notesFlag = false;
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
            {/* <div className="each-individual-message-title"> */}
            <div className="ea-message-title">
              <h1> {str.slice(0, str.length - 4)}</h1>
            </div>
          </Link>
        );
      }

      // str = str
      //   .split("_")
      //   .splice(1)
      //   .join(" ");

      // return (
      //   //
      //   //
      //   //check to see if the current index is an mp3 or pdf
      //   //if the current is mp3, and the next index is ===
      //   //as well as a pdf, then splice it out, and put a
      //   //box next to the current that links them to notes
      //   //
      //   //
      //   // <div key={e.Key} className="each-individual-message-title">
      //   <Link
      //     key={e.Key}
      //     to={`/${Object.keys(this.props.match.params)[0]}/${
      //       this.props.match.params[Object.keys(this.props.match.params)[0]]
      //     }/${
      //       // this.props.match.params[Object.keys(this.props.match.params)[0]]
      //       i
      //     }/?pdf=${notesFlag}`}
      //   >
      //     {/* <div className="each-individual-message-title"> */}
      //     <div className="ea-message-title">
      //       <h1> {str.slice(0, str.length - 4)}</h1>
      //     </div>
      //   </Link>
      // );
    });
    return (
      <div className="each-individual-message-holder">
        <BreadCrumb
          crumbs={[
            this.props.location.pathname.split("/")[1].toUpperCase(),
            title.split("_").join(" ")
          ]}
        />
        <h1 className="each-individual-message-holder__h1">
          {title.split("_").join(" ")}
        </h1>

        {messages.length !== 0 ? (
          <div className="each-individual-message-holder__notitle">
            {newMessages}
          </div>
        ) : (
          <LoadingDots />
        )}
      </div>
    );
  }
}
export default SpecificMessages;
