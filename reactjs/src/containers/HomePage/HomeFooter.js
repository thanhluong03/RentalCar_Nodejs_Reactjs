import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import logo from '../../assets/images/logo.png'; // 👈 thay đúng đường dẫn logo của bạn

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <div className="footer-content">
                    <div className="footer-left">
                        <img src={logo} alt="Logo" className="footer-logo" />
                    </div>
                    <div className="footer-center">
                        <p><strong>Hotline</strong>: 0989007679</p>
                        <p>Tổng đài hỗ trợ: 7AM - 10PM</p>
                    </div>
                    <div className="footer-right">
                        <p><strong>Email: </strong><a href="">nguyenluong@gmail.com</a></p>
                        <p>Gửi mail cho xe tự lái hương lúa</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

export default connect(mapStateToProps)(HomeFooter);
