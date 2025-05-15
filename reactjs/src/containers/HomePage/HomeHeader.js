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
            activeItem: '', // Mục đang được chọn
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
        // if (path.includes('/list-specialty')) this.setState({ activeItem: 'specialty' });
        // else if (path.includes('/list-clinic')) this.setState({ activeItem: 'clinic' });
        // else if (path.includes('/list-doctor')) this.setState({ activeItem: 'doctor' });
        // else this.setState({ activeItem: '' });
    };

    // handleMenuClick = (menu, route) => {
    //     this.setState({ activeItem: menu }, () => {
    //         this.props.history.push(route);
    //     });
    // };
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    handleViewLogin = () => {
        if(this.props.history) {
            this.props.history.push(`/login`)
        }
    }

    handleViewRegister = () => {
        if(this.props.history) {
            this.props.history.push(`/register`)
        }
    }
    render() {
        const { activeItem } = this.state;
        return (
            <React.Fragment>
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className='blur-bg'>

                        </div>
                        <img className="header-logo" src= {logo} onClick={() => this.returnToHome()}/>
                    </div>
                    <div className="right-content">
                        <div className="right-body">
                            <button className="register-btn"
<<<<<<< Updated upstream
                            onClick={() => this.handleViewLogin()}>Đăng ký</button>
=======
                            onClick={() => this.handleViewRegister()}>Đăng ký</button>
>>>>>>> Stashed changes
                            <button className="login-btn"
                            onClick={() => this.handleViewLogin()}>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
            {this.props.isShowBanner === true &&
                <div className="home-header-banner">
                <div className="content-up">
                    <div className="title1">< FormattedMessage id="banner.title1"/></div>
                    <div className="title2">< FormattedMessage id="banner.title2"/></div>
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
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
