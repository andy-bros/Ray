import React, { Component, Fragment } from "react";
//font awesome instead of bringing the imports in directly

import pause from "./images/pause-solid.svg";
import play from "./images/play-solid.svg";
import mute from "./images/volume-up-solid.svg";
import unmute from "./images/volume-off-solid.svg";
let barSize = 320;
var intervalToClear;
class AudioTag extends Component {
  state = {
    minutes: "",
    seconds: ""
  };
  componentWillUnmount() {
    window.clearInterval(intervalToClear);
  }
  pad = d => {
    return d < 10 ? "0" + d.toString() : d.toString();
  };
  getTimeLong = () => {
    let minutes = parseInt(this.refs.myTrack.duration / 60);
    let seconds = this.pad(parseInt(this.refs.myTrack.duration % 60));
    this.refs.fullDuration.innerHTML = `${minutes}:${seconds}`;
  };

  playOrPause = () => {
    if (!this.refs.myTrack.paused && !this.refs.myTrack.ended) {
      this.refs.myTrack.pause();
      this.refs.playButton.style.backgroundImage = `url(${play})`;
      // window.clearInterval(updateTime);
    } else {
      this.refs.myTrack.play();
      this.refs.playButton.style.backgroundImage = `url(${pause})`;

      intervalToClear = setInterval(this.update, 500);
    }
  };
  muteOrUnmute = () => {
    if (this.refs.myTrack.muted == true) {
      this.refs.myTrack.muted = false;
      this.refs.muteButton.style.backgroundImage = `url(${mute})`;
    } else {
      this.refs.myTrack.muted = true;
      this.refs.muteButton.style.backgroundImage = `url(${unmute})`;
    }
  };
  update = () => {
    if (!this.refs.myTrack) {
      return;
    }
    if (!this.refs.myTrack.ended) {
      let minutes = parseInt(this.refs.myTrack.currentTime / 60);

      let seconds = this.pad(parseInt(this.refs.myTrack.currentTime % 60));

      let size = parseInt(
        (this.refs.myTrack.currentTime * barSize) / this.refs.myTrack.duration
      );

      this.refs.progressBar.style.width = `${size}px`;
      this.setState({ minutes, seconds });
      this.refs.currentTime.innerHTML = `${minutes}:${seconds}`;
    } else {
      this.refs.currentTime.innerHTML = "0.00";
      this.setState({ minutes: "0", seconds: "00" });
      this.refs.playButton.style.backgroundImage =
        "url(./images/play-solid.svg)";

      this.refs.progressBar.style.width = "0px";
      // window.clearInterval(updateTime);
    }
  };
  clickedBar = e => {
    if (!this.refs.myTrack.ended) {
      let mouseX = e.pageX - this.refs.defaultBar.offsetLeft;
      let newTime = (mouseX * this.refs.myTrack.duration) / barSize;
      this.refs.myTrack.currentTime = newTime;
      this.refs.progressBar.style.width = `${mouseX}px`;
    }
  };
  render() {
    let { minutes, seconds } = this.state;
    return (
      <div ref="wrapper" id="wrapper">
        <audio ref="myTrack" id="myTrack" onLoadedMetadata={this.getTimeLong}>
          <source
            //getting the source from the parent component
            src={this.props.source}
            type="audio/mp3"
          />
        </audio>
        <nav>
          <div ref="defaultBar" id="defaultBar" onClick={this.clickedBar}>
            <div ref="progressBar" id="progressBar" />
          </div>
          <div ref="buttons" id="buttons">
            <button
              type="button"
              ref="playButton"
              id="playButton"
              onClick={this.playOrPause}
            />
            <button
              type="button"
              ref="muteButton"
              id="muteButton"
              onClick={this.muteOrUnmute}
            />
            <span ref="currentTime" id="currentTime">
              0:00
            </span>/
            <span ref="fullDuration" id="fullDuration">
              0:00
            </span>
          </div>
        </nav>
      </div>
    );
  }
}
export default AudioTag;
