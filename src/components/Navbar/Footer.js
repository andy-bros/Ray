import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <section className="information">
        <h4 className="footer-title">FIND US</h4>

        <span>
          <h4 className="footer-headings">Address</h4>
          <p>
            Meets at Oak Hill Assembly of God 5200 Franklin Pike Nashville, TN
            37220
          </p>
        </span>
        <span>
          <h4 className="footer-headings">Service Hours</h4>
          <p>Saturday nights from 5:00-6:30 PM</p>
        </span>
        <span>
          <h4 className="footer-headings">Contact</h4>
          <p>info@ccnashville.com</p>
        </span>
      </section>
      <section className="social-media" />
      <h6>Designed and Developed By Jacob and Joseph Anderson</h6>
    </footer>
  );
}
