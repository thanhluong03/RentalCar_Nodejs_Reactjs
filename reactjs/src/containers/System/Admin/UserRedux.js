import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import * as actions from '../../../store/actions';
import {CommonUtils, CRUD_ACTIONS} from "../../../utils";
import './UserRedux.scss'
import 'react-image-lightbox/style.css'
import Lightbox from 'react-image-lightbox';
import HomeFooter from '../../HomePage/HomeFooter';
import TableManagerUser from './TableManagerUser';
class ProductManage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

   async componentDidMount() {

       this.props.getGenderStart();
       this.props.getPositionStart();
       this.props.getRoleStart();
//         try {
//            let res= await getAllCodeService('gender');
//            if (res && res.errCode === 0){
//             this.setState ({
//                 genderArr: res.data
//             })
//            }
//            console.log('check: ', res);
// ;        } catch (e){
//             console.log(e);
//         }
    }

    componentDidUpdate(prevProps, prevState) {
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
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            });
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }
    
    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
       let isValid = this.checkValidateInput();
       if (isValid === false) return;
       let { action } = this.state;
       //fire redux action
       if (action === CRUD_ACTIONS.CREATE) {
       this.props.createNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address : this.state.address,
          phonenumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
          avatar: this.state.avatar
       })
    }
    if (action === CRUD_ACTIONS.EDIT){
        this.props.editUserRedux({
            id: this.state.userEditId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address : this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar
         })
    }

}
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 
             'password', 
             'firstName',
             'lastName',
             'phoneNumber',
             'address']
            for (let i = 0; i< arrCheck.length; i++)
            {
                if(!this.state[arrCheck[i]]){
                    isValid = false;
                    alert('This input is required: ' + arrCheck[i]);
                    break;
                }
            }
            return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'user.password',
            firstName: user.firstName,
            lastName: user.lastName,
            address : user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
         })
    }
    render() {

        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isGetGender = this.props.isLoadingGender;

        let {email, 
             password, 
             firstName,
             lastName,
             phoneNumber,
             address,
             gender,
             position,
             role,
             avatar} = this.state;
                    let { isLoadingGender, isLoadingRole, isLoadingPosition } = this.props;
        let isLoading = isLoadingGender || isLoadingRole || isLoadingPosition;         
        console.log('thanh luong check prop : ', this.state)
        return (
            <>
            <div className="user-redux-container" >
                {isLoading && (
                    <div className="progress-container">
                        <div className="progress-bar"></div>
                    </div>
                )}
                <div className="title">
                    Quản lý người dùng
                </div>
            
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row input-text">
                            <div className="col-3">
                                <label>Địa chỉ email</label>
                                <input type="email" className="form-control" 
                                value={email}
                                onChange={(event) => {this.onChangeInput(event, 'email')}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}/>
                            </div>
                            <div className="col-3">
                                <label>Mật khẩu</label>
                                <input type="password" className="form-control" 
                                value={password}
                                onChange={(event) => {this.onChangeInput(event, 'password')}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}/>
                            </div>
                            <div className="col-3">
                                <label>Tên</label>
                                <input type="text" className="form-control" 
                                value={firstName}
                                onChange={(event) => {this.onChangeInput(event, 'firstName')}}/>
                            </div>
                            <div className="col-3">
                                <label>Họ/Tên đệm</label>
                                <input type="text" className="form-control" 
                                value={lastName}
                                onChange={(event) => {this.onChangeInput(event, 'lastName')}}/>
                            </div>
                            <div className="col-3">
                                <label>Số điện thoại</label>
                                <input type="text" className="form-control" 
                                value={phoneNumber}
                                onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}/>
                            </div>
                            <div className="col-9">
                                <label>Địa chỉ</label>
                                <input type="text" className="form-control" 
                                value={address}
                                onChange={(event) => {this.onChangeInput(event, 'address')}}/>
                            </div>
                            <div className="col-3">
                                <label>Giới tính</label>
                                <select className="form-control" 
                                onChange={(event) => {this.onChangeInput(event, 'gender')}}
                                value={gender}>
                                    {genders && genders.length > 0 && 
                                    genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                        )
                                    })
                                    }
                                    
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Chức vụ/vị trí</label>
                                <select className="form-control"
                                onChange={(event) => {this.onChangeInput(event, 'position')}}
                                value={position}>
                                    {
                                        positions && positions.length > 0 
                                        && positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            ) 
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Quyền</label>
                                <select className="form-control" 
                                onChange={(event) => {this.onChangeInput(event, 'role')}}
                                value={role}>
                                    {
                                        roles && roles.length > 0 
                                        && roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            ) 
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Ảnh</label>
                                <div className="preview-img-container">
                                    <input id ="previewImg" type="file" hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}/>
                                    <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                     style= {{backgroundImage: `url(${this.state.previewImgUrl})`}}
                                     onClick={() => this.openPreviewImage()}
                                    >
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button 
                                className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning":"btn btn-primary"} 
                                onClick={() => this.handleSaveUser()}>
                                    {
                                        this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit"/>
                                        :
                                        <FormattedMessage id="manage-user.save"/>
                                    }
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManagerUser
                                handleEditUserFromParentKey={this.handleEditUserFromParent}
                                action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen === true && 
                    <Lightbox 
                     mainSrc= {this.state.previewImgUrl}
                     onCloseRequest={() => this.setState({isOpen: false})}
                    />
                    }
                
                </div>
            </div>
            <HomeFooter/>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);


