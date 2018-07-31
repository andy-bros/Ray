import React, { Component, Fragment } from "react";
import axios from "axios";
import queryString from "query-string";

class EachIndividualMessage extends Component {
  state = { message: "", pdf: "", pdfQuery: false };
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
  componentDidMount() {
    console.log("messages", this.props.match.params.messages);
    console.log("id", this.props.match.params.id);
    let id = this.props.match.params.id;
    let key = Object.keys(this.props.match.params)[0];
    key = key[0].toUpperCase() + key.slice(1);
    console.log(key);
    axios.get(`/api/getmessages?section=${key}`).then(res => {
      console.log(
        res.data[
          this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
        ].messages.slice(1)[id].Key
        // res.data[
        //   this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
        // ].messages[id]
      );
      this.setState({
        pdfQuery: queryString.parse(window.location.search).pdf,
        message:
          key === "Courses"
            ? res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].messages.slice(1)[id].Key
            : res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].messages[id].Key,
        // date: `${this.findMonth(str.slice(7, 9))} ${str.slice(
        //   9,
        //   11
        // )}, ${str.slice(3, 7)}`,
        pdf: `${res.data[
          this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
        ].messages
          .slice(1)
          [id].Key.slice(
            0,
            res.data[
              this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
            ].messages.slice(1)[id].Key.length - 4
          )}.pdf`
      });
    });
  }
  render() {
    let { pdf, message, pdfQuery } = this.state;
    console.log(message);

    return (
      //if query pdf = true return this
      //make sure you always return an mp3 audio tape though
      //this is where the pdf and mp3 will display on the screen
      <div>
        {message && (
          <article className="ind-audio">
            <div className="cont">
              <h3>Audio and Mp3 Name</h3>
              <time>test dates</time>
            </div>
            <audio className="audio" controls="controls">
              <source
                src={`https://s3.amazonaws.com/raymp3s/${this.state.message}`}
                type="audio/mpeg"
              />
            </audio>
          </article>
        )}

        {pdfQuery === "true" && (
          <embed
            className="pdf-design"
            src={`https://s3.amazonaws.com/raymp3s/${pdf}`}
            type="application/pdf"
          />
        )}
      </div>
    );
  }
}
export default EachIndividualMessage;
