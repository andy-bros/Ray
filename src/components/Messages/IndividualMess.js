import React, { Component, Fragment } from "react";
import axios from "axios";
import queryString from "query-string";
import AudioTag from "./AudioTag/AudioTag";

class EachIndividualMessage extends Component {
  state = { message: "", pdf: "", pdfQuery: false, date: "", messageName: "" };
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
    console.log(this.findMonth);
    let id = this.props.match.params.id;
    let key = Object.keys(this.props.match.params)[0];
    key = key[0].toUpperCase() + key.slice(1);
    console.log(key);
    axios.get(`/api/getmessages?section=${key}`).then(res => {
      let message =
        key === "Courses"
          ? res.data[
              this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
            ].messages.slice(1)[id].Key
          : res.data[
              this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
            ].messages[id].Key;
      console.log(message.split("/")[2].slice(3, 11));
      let messageDate = message.split("/")[2];
      let preMessageName = messageDate.split("_").slice(1);
      // let messageName = `${preMessageName[1]} ${
      //   preMessageName[2]
      // } ${preMessageName[3].slice(0, preMessageName[3].length - 4)}`;

      preMessageName = preMessageName.join(" ");
      console.log(preMessageName);
      let messageName = preMessageName.slice(0, preMessageName.length - 4);
      let date = `${this.findMonth(
        messageDate.slice(7, 9)
      )} ${messageDate.slice(9, 11)}, ${messageDate.slice(3, 7)}`;
      console.log(date);
      this.setState({
        pdfQuery: queryString.parse(window.location.search).pdf,
        message,
        date,
        messageName,
        pdf:
          key === "Courses" &&
          `${res.data[
            this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
          ].messages
            .slice(1)
            [id].Key.slice(
              0,
              res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].messages.slice(1)[id].Key.length - 4
            )}.pdf`
      });
    });
  }
  render() {
    let { pdf, message, pdfQuery, date, messageName } = this.state;
    console.log(message);
    return (
      //if query pdf = true return this
      //make sure you always return an mp3 audio tape though
      //this is where the pdf and mp3 will display on the screen
      <div>
        {message && (
          <article className="ind-audio">
            <div className="cont">
              <h3>{messageName}</h3>
              <time>{date}</time>
            </div>
            <AudioTag
              source={`https://s3.amazonaws.com/raymp3s/${this.state.message}`}
            />
          </article>
          // <article className="ind-audio">
          //   <div className="cont">
          //     <h3>{messageName}</h3>
          //     <time>{date}</time>
          //   </div>
          //   <audio className="audio" controls="controls">
          //     <source
          //       src={`https://s3.amazonaws.com/raymp3s/${this.state.message}`}
          //       type="audio/mpeg"
          //     />
          //   </audio>
          // </article>
        )}

        {pdfQuery === "true" && (
          <object
            className="pdf-design"
            data={`https://docs.google.com/gview?embedded=true&url=https://s3.amazonaws.com/raymp3s/${pdf}`}
          >
            <p>
              Your web browser does not have a PDF plugin. Instead you can
              <a href={`https://s3.amazonaws.com/raymp3s/${pdf}`}>
                click here to download and view the PDF file.
              </a>
            </p>
          </object>
          // <embed
          //   className="pdf-design"
          //   src={`https://s3.amazonaws.com/raymp3s/${pdf}`}
          //   type="application/pdf"
          // />
        )}
      </div>
    );
  }
}
export default EachIndividualMessage;
