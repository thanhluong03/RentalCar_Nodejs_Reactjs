import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import logo from '../../assets/images/logo.png';
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
        let confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất không?")
        if(confirmLogout){
            this.props.processLogout(); // Xóa Redux
            localStorage.removeItem('userInfo'); // Xóa khỏi localStorage
            sessionStorage.removeItem('userInfo'); // Xóa khỏi sessionStorage
            window.location.href = '/login'; // Điều hướng về trang đăng nhập
        }
    };

    render() {
        const { userInfo } = this.props;
        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="welcome">
                    <div className='image'>
                        <img className="logo" src= {logo} onClick={() => this.returnToHome()}/>
                    </div>
                    <span className="welcome-span">
                        Welcome, {userInfo && userInfo.first_name ? userInfo.first_name : ''}
                    </span>
                <div className="logout" onClick={this.handleLogout}>
                    <span className="name-logout">Đăng xuất</span>
                    <div className="btn btn-logout">
                </div>
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="logout">
                    <span className="name-logout">Đăng xuất</span>
                    <div className="btn btn-logout" onClick={this.handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
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
