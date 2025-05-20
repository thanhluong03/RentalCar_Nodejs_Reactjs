import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const { isLoggedIn, userInfo } = this.props;
        console.log("User Info:", userInfo);

        if (!isLoggedIn) {
            return <Redirect to="/home" />;
        }
        let linkToRedirect = '/home';
        if (userInfo && userInfo.roleId === 'ADMIN') {
            linkToRedirect = '/system/list-user';
        } else if (userInfo && userInfo.roleId === 'Staff') {
            linkToRedirect = '/home';
        }

        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

export default connect(mapStateToProps)(Home);
