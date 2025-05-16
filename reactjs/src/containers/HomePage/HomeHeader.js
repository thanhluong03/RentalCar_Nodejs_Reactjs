import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.png';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
            searchQuery: ''
        };
    }

    componentDidMount() {
        this.updateActiveItem(this.props.location.pathname);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.updateActiveItem(this.props.location.pathname);
        }
    }

    updateActiveItem = (path) => {
        // Tùy chỉnh logic nếu cần
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
    }

handleSearchSubmit = () => {
    const { searchQuery } = this.state;
    if (searchQuery.trim() && this.props.history) {
        this.props.history.push(`/search-car?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
};
    render() {
        const { searchQuery } = this.state;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className='blur-bg'></div>
                            <img
                                className="header-logo"
                                src={logo}
                                alt="Logo"
                                onClick={this.returnToHome}
                            />
                        </div>
                        <div className="right-content">
                            <div className="right-body">
                                <div className="search-box">
                                    <input type="text" placeholder="Tìm kiếm...."
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
                                {/* <input className="search-input" type="text" placeholder="Tìm kiếm..." /> */}
                                <button className="register-btn" onClick={this.handleViewRegister}>
                                    Đăng ký
                                </button>
                                <button className="login-btn" onClick={this.handleViewLogin}>
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title2"><FormattedMessage id="banner.title2" /></div>
                        </div>
                    </div>
                }
            </React.Fragment>
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
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
