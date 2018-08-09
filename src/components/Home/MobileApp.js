import React, { Component } from "react";
import NativeDetails from "./nativeappsection";
import AppStore from '../../assets/apple-download-dark.png';
import GooglePlay from '../../assets/GooglePlayStoredownload-300x98.png';

class MobileApp extends Component{
    render(){
        return(
            <section id="native-app-holder">
            <div className="native-header-holder">
          <h2 className="native-title">MOBILE APP</h2>
          <h4>Sermons, Bible, Calendar, Resources, and More</h4>
          </div>
          <iframe allowTransparency="true" background="transparent" src="https://www.youtube.com/embed/RsiYpXkwqDE" />
          <div className="mobile-app-details-holder">
          <NativeDetails title="IT'S EASY" paragraph="There are several, easy to use menu buttons at the bottom of the app that make navigating a breeze.   Whether your’e looking for the most current sermon or interested in an upcoming church event, the mobile app makes it easy to find what you’re looking for with the click of a button!" />
          <NativeDetails title="IT'S USEFUL" paragraph="Aside from the powerful messages preached each week, the mobile app allows you to download sermons and sermon notes, read Pastor Ray’s blog posts, information on our church missions, church events, and more.  We send a push notification (text) once a new sermon has been posted to keep you in the know" />
          
          <NativeDetails title="IT'S FREE" paragraph="You cant get better than free, right?!  Our goal is to spread the gospel and want everyone to be blessed by our messages and what our church stands for – to further the Kingdom of God!  We have a mobile platform for both iPhone and Android users so see below to download." />
          </div>
          <div className="native-icon-holder">
          <a href="https://itunes.apple.com/us/app/celebration-church-tn/id1141564210?mt=8&ign-mpt=uo%3D4"><img src={AppStore} width="150px"height="50px" /></a>
         <a href="https://play.google.com/store/apps/details?id=com.subsplashconsulting.s_K5J8HC"> <img src={GooglePlay} width="150px"height="50px" /></a>
</div>
        </section>
        )
    }
}
export default MobileApp;