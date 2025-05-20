import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Header  from '.Header/Header';
import HomeHeader from './HomeHeader';
// import Specialty  from './Section/Specialty';   
// import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import OutstandingDoctor from './Section/OutstandingDoctor';
// import HandBook from './Section/HandBook';
// import About from './Section/About';
import HomeFooter from './HomeFooter';
class HomePage extends Component {

    render() {
        let settings = {
        dots: false,
        infinite: false,
        sped: 500,
        slidesToShow: 5,
        slidesToScroll: 2
    };
        return (
            <div>
                <HomeHeader isShowBanner= {true}/>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
