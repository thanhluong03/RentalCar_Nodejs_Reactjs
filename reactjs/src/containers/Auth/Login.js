import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { USER_ROLE } from '../../utils/constant';
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import  { handleLoginApi } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          errMessage: '',
        }
    }
    handleOnChangeUserName = (event) => {
        this.setState({ username: event.target.value});
        console.log(event.target.value)
    }
    handleOnChangePassword = (event) => {
        this.setState({ password: event.target.value})
        console.log(event.target.value)
    }
    handleLogin = async () => {
        this.setState({ errMessage: '' });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({ errMessage: data.message });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('Login successful');
    
                // Lưu user vào localStorage
                localStorage.setItem('userInfo', JSON.stringify(data.user));
    
                if (data.user.roleId === USER_ROLE.ADMIN) {
                    this.props.navigate('/system/car-form');
                } else if (data.user.roleId === USER_ROLE.Staff) {
                    this.props.navigate('/staff/manage-staff');
                }
            }
        } catch (e) {
            if (e.response && e.response.data) {
                this.setState({ errMessage: e.response.data.message });
            }
        }
    };
    

    handleKeyDown = (event) => {
        if(event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }

    handleViewRegister = () => {
        if(this.props.history) {
            this.props.history.push(`/register`)
        }
    }

    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Đăng nhập</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Enter your name" value={this.state.username} onChange={(event) => this.handleOnChangeUserName(event)}/>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password" 
                            value={this.state.password} 
                            onChange={(event) => this.handleOnChangePassword(event)}
                            onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>
                        <div className="col-12" style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login"  onClick={()=> {this.handleLogin()}}>Log in</button>
                        </div>
                        <div className="col-12">
                            <span className= "forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <button className='btn-register'
                            onClick={() => this.handleViewRegister()}>Đăng ký</button>
                            <div className="text-other-login"> Or Login with: </div>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div> 
                    </div>
                </div>
            </div>
        )   
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
