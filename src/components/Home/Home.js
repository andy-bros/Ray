import React, { Component } from "react";
import data from "./../../assets/data";

export default class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <main className="home-container">
        <div className="home-page">
            <div className = 'splash-text'>
            <h1>Pastor Ray McCollum</h1>
            <h2 className = 'sub-heading'>When the going gets tough... the tough talk to Pastor Ray.</h2>
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
                Tennessee for the past 35 years and is the founder of Bethel
                World Outreach Center in Brentwood, TN, established in 1984.
              </p>
              <p>
                He is widely known for his Bible-teaching ministry and gift of
                revelation, which flows out of a “prophetic view” of the Bible,
                where the “big picture” of scripture is used to explain and
                interpret the details. His book, “The Power Of God-Given
                Imagination” was published by Whitaker House last year.
              </p>
              <p>
                Ray came to Christ in 1971, and entered the ministry at age 43,
                after 25 years in the business world. Ray and his wife Elizabeth
                have been married 48 years and have 2 children and 7
                grandchildren.
              </p>
            </figcaption>
          </content>
        </section>
      </main>
    );
  }
}
