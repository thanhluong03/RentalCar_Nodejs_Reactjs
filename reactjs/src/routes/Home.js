import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    
    componentDidMount() {
        const { history } = this.props;
        // Điều hướng ngay đến /system/user-redux khi component được render
        history.push('/system/user-redux');
    }

    render() {
        return null; // Không cần render gì, chỉ cần điều hướng là đủ
    }
}

export default withRouter(Home);
