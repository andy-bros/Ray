import React from "react";

export default function Footer() {
  return (
    <footer className="footer-container">
      <section className="information">
        <h4 className="bottom-border">CONTACT US</h4>
        <span>
          <h4 className="footer-headings">Email</h4>

          <a
            className="report-bug"
            href={`mailto:Ray@PastorRay.com
            ?subject=Greetings%20Pastor%20Ray&body=Lets%20grab%20a%20coffee!`}
          >
            <p>Ray@PastorRay.com</p>
          </a>
        </span>
        <span>
          <h4 className="footer-headings">Mailing Address</h4>
          <p>330 Franklin Road Suite 135A-408 Brentwood,TN 37027</p>
        </span>
        <span>
          <h4 className="footer-headings">Phone</h4>
          <p>(615)477-2912</p>
        </span>
        <span>
          <h4 className="footer-headings">Services</h4>
          <p>
            Celebration Church meets Saturdays at 5pm at Oak Hill Assembly of
            God, 5200 Franklin Pike, Nashville, TN 37220
          </p>
        </span>
      </section>
      <section className="social-media" />
      <h6>
        Designed and Developed By{" "}
        <a
          className="email-me"
          href={`mailto:jake@jakea.io
            ?subject=Greetings%20Jacob!&body=Lets%20grab%20a%20coffee!`}
        >
          <span>Jacob Anderson</span>
        </a>
      </h6>
    </footer>
  );
}
