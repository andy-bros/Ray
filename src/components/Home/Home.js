import React, { Component } from "react";
import data from "./../../assets/data";
import ArrowDown from "../../assets/angle-double-down-solid.svg";
import MobileApp from "./MobileApp";

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
              God and advance His Kingdom.
            </h2>
          </div>
          <a href="#about">
            <i class="bouncing-arrow fas fa-arrow-circle-down" />
            <span className="bouncing-arrow background" />
          </a>
        </div>
        <section className="about-section" id="about">
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
        <MobileApp />
      </main>
    );
  }
}
