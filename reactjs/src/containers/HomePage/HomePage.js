import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Header  from '.Header/Header';
import HomeHeader from './HomeHeader';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeListCar from './section/HomeListCar';
import LocationList from './section/LocationList';
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
                <LocationList settings = {settings}/>
                <HomeListCar/>
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
