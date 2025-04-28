import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import staff from '../containers/System/Staff/staff';
class Staff extends Component {
    render() {
        const {isLoggedIn} = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="Staff-container">
                    <div className="Staff-list">
                        <Switch>
                            <Route path="/staff/manage-staff" component={staff} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
