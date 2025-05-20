import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../services/userService';
import * as actions from '../../store/actions/adminActions/userActions';
import * as useractions from '../../store/actions/userActions';
import { CommonUtils } from '../../utils';
import './Register.scss';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { push } from "connected-react-router";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            previewImgUrl: '',

            first_name: '',
            last_name: '',
            age: '',
            gender: '',
            avatar: '',
            phone: '',
            email: '',
            password: '',
            role: '',
            isOpen: false,
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            });
        }
    }

    handleOnchangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            });
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({ isOpen: true });
    }

    handleSaveUser = () => {
        if (!this.checkValidateInput()) return;

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
            phone: this.state.phone,
            gender: this.state.gender,
            roleId: this.state.role,
            avatar: this.state.avatar,
        }).then (() => {
            this.props.processLogout(); // Xóa Redux
            localStorage.removeItem('userInfo'); // Xóa khỏi localStorage
            sessionStorage.removeItem('userInfo');
            this.props.navigate('/login');
        }).catch(err => {
            console.log("Error: ", err);
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let requiredFields = ['email', 'password', 'first_name', 'last_name', 'age', 'phone'];
        for (let field of requiredFields) {
            if (!this.state[field]) {
                isValid = false;
                alert('This input is required: ' + field);
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, field) => {
        this.setState({ [field]: event.target.value });
    }

    render() {
        const { genderArr, roleArr, previewImgUrl, isOpen } = this.state;
        console.log('check user: ', this.state)
        return (
            <div className="register-background">
                <div className="register-container">
                    <div className="register-content">
                        <div className="text-register">Đăng ký</div>

                        <div className="register-input">
                            <label>Email</label>
                            <input type="email" className="form-control" 
                            onChange={(e) => this.onChangeInput(e, 'email')} 
                            value={this.state.email} />
                        </div>
                        <div className="register-input">
                            <label>Mật khẩu</label>
                            <input type="password" className="form-control" 
                            onChange={(e) => this.onChangeInput(e, 'password')} 
                            value={this.state.password} />
                        </div>
                        <div className="register-input">
                            <label>Họ</label>
                            <input type="text" className="form-control" 
                            onChange={(e) => this.onChangeInput(e, 'last_name')} 
                            value={this.state.last_name} />
                        </div>
                        <div className="register-input">
                            <label>Tên</label>
                            <input type="text" className="form-control" 
                            onChange={(e) => this.onChangeInput(e, 'first_name')} 
                            value={this.state.first_name} />
                        </div>
                        <div className="register-input">
                            <label>Tuổi</label>
                            <input type="number" className="form-control" 
                            onChange={(e) => this.onChangeInput(e, 'age')} 
                            value={this.state.age} />
                        </div>
                        <div className="register-input">
                            <label>Số điện thoại</label>
                            <input type="text" className="form-control" 
                            onChange={(e) => this.onChangeInput(e, 'phone')} 
                            value={this.state.phone} />
                        </div>
                        <div className="register-input">
                            <label>Giới tính</label>
                            <select className="form-control" 
                            onChange={(e) => this.onChangeInput(e, 'gender')} 
                            value={this.state.gender}>
                                {genderArr.map((item, index) => (
                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                ))}
                            </select>
                        </div>
                        <div className="register-input">
                            <label>Vai trò</label>
                            <select className="form-control" 
                            onChange={(e) => this.onChangeInput(e, 'role')} 
                            value={this.state.role}>
                                {roleArr.map((item, index) => (
                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                ))}
                            </select>
                        </div>
                        <div className="register-input">
                            <label>Ảnh bằng lái xe</label>
                            <input id="previewImg" type="file" hidden onChange={this.handleOnchangeImage} />
                            <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                            <div className="preview-image" style={{ backgroundImage: `url(${previewImgUrl})` }} onClick={this.openPreviewImage} />
                        </div>
                        <button className="btn-register" onClick={this.handleSaveUser}>Đăng ký</button>
                    </div>
                    {isOpen && <Lightbox mainSrc={previewImgUrl} onCloseRequest={() => this.setState({ isOpen: false })} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        processLogout: () => dispatch(useractions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);