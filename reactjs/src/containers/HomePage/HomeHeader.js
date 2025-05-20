import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.png';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
            searchQuery: '',
            isDropdownOpen: false,
        };
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        this.updateActiveItem(this.props.location.pathname);
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.updateActiveItem(this.props.location.pathname);
        }
    }

    updateActiveItem = (path) => {
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    }

    handleViewLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`);
        }
    }

    handleViewRegister = () => {
        if (this.props.history) {
            this.props.history.push(`/register`);
        }
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSearchSubmit = () => {
        const { searchQuery } = this.state;
        if (searchQuery.trim() && this.props.history) {
            this.props.history.push(`/search-car?keyword=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    toggleDropdown = () => {
        this.setState((prev) => ({ isDropdownOpen: !prev.isDropdownOpen }));
    };

    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ isDropdownOpen: false });
        }
    };

    handleLogout = () => {
        this.props.processLogout();
    };

    render() {
        const { searchQuery, isDropdownOpen } = this.state;
        const { isLoggedIn, userInfo } = this.props;

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className='blur-bg'></div>
                            <img className="header-logo" src={logo} alt="Logo" onClick={this.returnToHome} />
                        </div>
                        <div className="right-content">
                            <div className="right-body">
                                <div className="search-box">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm...."
                                        value={searchQuery}
                                        onChange={this.handleSearchChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') this.handleSearchSubmit();
                                        }}
                                    />
                                    <button className="search-btn" onClick={this.handleSearchSubmit}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>

                                {!isLoggedIn ? (
                                    <>
                                        <button className="register-btn" onClick={this.handleViewRegister}>
                                            Đăng ký
                                        </button>
                                        <button className="login-btn" onClick={this.handleViewLogin}>
                                            Đăng nhập
                                        </button>
                                    </>
                                ) : (
                                    <div className="user-menu" ref={this.dropdownRef}>
                                        <div className="user-name" onClick={this.toggleDropdown}>
                                            Xin chào, {userInfo?.first_name || 'Người dùng'}
                                        </div>
                                        {isDropdownOpen && (
                                            <div className="user-dropdown">
                                                <div className="dropdown-item" onClick={this.handleLogout}>
                                                    Đăng xuất
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title2"><FormattedMessage id="banner.title2" /></div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
