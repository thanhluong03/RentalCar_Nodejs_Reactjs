import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { USER_ROLE } from '../../utils';
import _ from 'lodash';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfo !== this.props.userInfo) {
            this.updateMenu();
        }
    }

    componentDidMount() {
        this.updateMenu();
    }

    updateMenu = () => {
        const { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            menu = userInfo.roleId === USER_ROLE.ADMIN ? adminMenu : doctorMenu;
        }
        this.setState({ menuApp: menu });
    };

    handleLogout = () => {
        this.props.processLogout(); // Xóa Redux
        localStorage.removeItem('userInfo'); // Xóa khỏi localStorage
        sessionStorage.removeItem('userInfo'); // Xóa khỏi sessionStorage
        window.location.href = '/login'; // Điều hướng về trang đăng nhập
    };

    render() {
        const { userInfo } = this.props;
        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="welcome">
                    <span className="welcome-span">
                        Welcome, {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>
                    <div className="btn btn-logout" onClick={this.handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
