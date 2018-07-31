import React, { Component, Fragment } from "react";
import axios from "axios";

class EachIndividualMessage extends Component {
  state = { message: [], pdf: [] };
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
        ].messages
        // res.data[
        //   this.props.match.params[key[0].toLocaleLowerCase() + key.slice(1)]
        // ].messages[id]
      );
      this.setState({
        message:
          key === "Courses"
            ? res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].messages.slice(1).Key
            : res.data[
                this.props.match.params[
                  key[0].toLocaleLowerCase() + key.slice(1)
                ]
              ].messages[id].Key,
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
    let { pdf, message } = this.state;
    return (
      //if query pdf = true return this
      //make sure you always return an mp3 audio tape though
      //this is where the pdf and mp3 will display on the screen
      <div style={{ marginTop: "600px" }}>
        <a href={`https://s3.amazonaws.com/raymp3s/${pdf}`}>pdf</a>
      </div>
    );
  }
}
export default EachIndividualMessage;
