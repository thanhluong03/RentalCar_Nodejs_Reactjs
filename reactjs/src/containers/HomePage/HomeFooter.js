import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FormattedMessage } from 'react-intl';



class HomeFooter extends Component {

    render() {
        return (
            <div className="home-footer">
                <div className="footer-info">
                    <span className="footer-name">Sản phẩm học tập</span>
                </div>
                <div className="footer-contact">
                    <div className="footer-title">Liên hệ</div>
                    <p className="footer-text">
                        &copy; Thanhluong depzai.
                        <a className="footer-link" target="_blank" href="https://github.com/thanhluong03">
                            &#8594; Click here &#8592;
                        </a>
                    </p>
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

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
