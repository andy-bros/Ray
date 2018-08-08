import React, { Component } from "react";
import data from "./../../assets/data";

export default class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <main className="home-container">
        <div className="home-page">
          <div className="splash-text">
            <h1 className="main-title">PastorRay.com</h1>
            <h2 className="sub-heading">
              Welcome to our donation supported website offering teaching<br />
              materials to the Body of Christ designed to bless the family of<br />
              God and advance His Kingdom
              {/* "The Lord has given me the tongue of a disciple<br /> that I may
              know how to sustain the weary one with<br /> a word"<br /> -Isaiah
              50:4{" "} */}
            </h2>
          </div>
        </div>
        <section className="about-section">
          <content className="content-container">
            <img
              className="preaching-ray"
              src={data.profilePic}
              width="200px"
            />
            <figcaption className="description flex-column">
              <h2>ABOUT PASTOR RAY</h2>
              <p>
                Pastor Ray McCollum has been in pastoral ministry in Middle
                Tennessee since 1983
              </p>
              <p>
                He is widely known for his Bible-teaching ministry and gift of
                revelation, which flows out of a “prophetic view” of the Bible,
                where the “big picture” of scripture is used to explain and
                interpret the details. His book, “The Power Of God-Given
                Imagination” was published by Whitaker House.
              </p>
              <p>
                Pastor Ray is pleased to offer the teaching materials on this
                website on a donation basis. We trust you will be blessed!
              </p>
            </figcaption>
          </content>
        </section>
      </main>
    );
  }
}
