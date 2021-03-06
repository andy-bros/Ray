import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingDots from "../animations/Loading";
import BreadCrumbNav from "../BreadCrumb/BreadCrumb";

const imagesArr = [
  "https://s3.amazonaws.com/raymp3s/Images/Ray-Recapturing-Authentic-Apostolic-Christianity-banner-768x277.png",
  "https://s3.amazonaws.com/raymp3s/Images/Ray-Shadows-of-the-Cross-banner-.png",
  "https://s3.amazonaws.com/raymp3s/Images/Ray-The-Bait-of-Satan.png",
  "https://s3.amazonaws.com/raymp3s/Images/Ray-The-Battle-of-the-Mind-banner-.png",
  "https://s3.amazonaws.com/raymp3s/Images/Ray-The-Discipleship-of-Abraham-Banner-1-768x277.png",
  "https://s3.amazonaws.com/raymp3s/Images/RaySermonOnTheMound.png",
  "https://s3.amazonaws.com/raymp3s/Images/Ray-The-Word-Became-Flesh-banner.png",
  "https://s3.amazonaws.com/raymp3s/Images/RAY-WarOfTheWorld.jpg"
];
class Messages extends Component {
  state = {
    messages: [],
    currMessage: []
  };
  componentDidMount() {
    axios.get(`/api/getmessages?section=${this.props.type}`).then(res => {
      this.setState({ messages: res.data });
    });
  }
  render() {
    let { messages } = this.state;
    let { type } = this.props;
    let mappedMessages = messages.map((e, i) => {
      // let visibility = "hidden";
      // setTimeout(() => (visibility = "visible"), i);
      return (
        <Link
          key={i}
          to={`/${this.props.type[0].toLowerCase() +
            this.props.type.slice(1)}/${i}`}
        >
          <div
            className="ea-message-title"
            style={
              this.props.type === "Courses" && (i === 5 || i === 7)
                ? {
                    border: "10px solid rgba(201,0,0,.7)",
                    borderRadius: "10px",
                    backgroundImage: `url(${imagesArr[i]})`,
                    backgroundSize: "280px 150px",
                    backgroundRepeat: "no-repeat"
                  }
                : this.props.type === "Courses"
                  ? {
                      backgroundImage: `url(${imagesArr[i]})`,
                      backgroundSize: "280px 150px",
                      backgroundRepeat: "no-repeat"
                    }
                  : {}
            }
          >
            {this.props.type !== "Courses" && (
              <h1>
                {e.Title.slice(this.props.type.length + 1, e.Title.length - 1)
                  .split("_")
                  .join(" ")}
              </h1>
            )}
          </div>
          {this.props.type === "Courses" &&
            (i === 5 || i === 7) && (
              <p id="notice-current-message">Most Current Series</p>
            )}
        </Link>
      );
    });
    return (
      <Fragment>
        <BreadCrumbNav crumbs={this.props.crumbs} />
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
