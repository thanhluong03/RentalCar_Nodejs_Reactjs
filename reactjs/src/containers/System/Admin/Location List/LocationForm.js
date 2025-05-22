
import React, { Component} from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from '../../../../store/actions/adminActions/locationActions';
import { CommonUtils, CRUD_ACTIONS } from "../../../../utils";
import './LocationForm.scss'
import LocationList from "./LocationList";
import { toast } from "react-toastify";
class CarForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: '',

            nameLocation: '',
            avatar: '',
            action: CRUD_ACTIONS.CREATE,
            locationIdEdit: '',
            showForm: false,
        }
    }

    async componentDidMount() {
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listLocations !== this.props.listLocations) {
            this.setState({
                nameLocation: '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
                showForm: false,
            })
        }

        if (prevProps.errorMessage !== this.props.errorMessage) {
            if (this.props.errorMessage) {
                toast.error(this.props.errorMessage); 
            }
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState ({
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

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['nameLocation'];
    
        if (this.state.action === CRUD_ACTIONS.CREATE) {
            arrCheck.push('avatar');
        }
    
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
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
    handleSaveLocation = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        let {action} = this.state;

        if(action === CRUD_ACTIONS.CREATE) {
            this.props.createNewLocation({
                name_location: this.state.nameLocation,
                image: this.state.avatar,
            })
        }

        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editLocation({
                id: this.state.locationIdEdit,
                name_location: this.state.nameLocation,
                avatar: this.state.avatar
            })
        }
        this.setState({showForm: false});
    }

    handleButtonEditLocation = (location) => {
        let imageBase64 = '';
        if(location.image){
            imageBase64 = new Buffer(location.image, 'base64').toString('binary');
        }

        this.setState ({
            nameLocation: location.name_location,
            action: CRUD_ACTIONS.EDIT,
            previewImgUrl: imageBase64,
            locationIdEdit: location.id,
            avatar: '',
            showForm: true
            
        })
    }
handleCancel = () => {
        this.setState({
            nameLocation: '',
            avatar: '',
            previewImgUrl: '',
            locationIdEdit: '',
            action: CRUD_ACTIONS.CREATE,
            showForm: false
        });
    }
    render() {
        let {
                nameLocation,
                avatar,
        } = this.state;
        console.log('thanh luong check prop : ', this.state)
        return (
            <div className="location-redux-container">
                <div className="title">
                    Quản lý địa điểm
                </div>
                <div className="mb-2">
                    <button
                        className="btn-add"
                        onClick={() => this.setState({
                            action: CRUD_ACTIONS.CREATE,
                            showForm: true,
                            nameLocation: '',
                            avatar: '',
                            previewImgUrl: '',
                            locationIdEdit: '',
                        })}
                    >
                    Thêm địa chỉ mới
                    </button>
                </div>
                {this.state.showForm && (
                    <>
                        <div className="location-modal">
                            <div className="location-modal-content">
                                <div className="row input-text">
                                    <div className="title-car"><span className="titlecar">Thông tin địa chỉ</span></div>
                                    <div className="button">
                                    <span className="btn-secondary"
                                    onClick={this.handleCancel}><i className="fas fa-times"></i></span>
                                    </div>
                                    <div className="col-6">
                                        <label>Tên địa điểm</label>
                                        <input type="text" className="form-control"
                                            value={nameLocation}
                                            onChange={(event) => this.onChangeInput(event, 'nameLocation')} />
                                    </div>
                                    <div className="col-6">
                                        <label>Ảnh</label>
                                        <div className="img-container">
                                            <input id="previewImg" type="file" hidden
                                                onChange={(event) => this.handleOnchangeImage(event)} />
                                            <label className="label-upload" htmlFor="previewImg">
                                                Tải ảnh <i className="fas fa-upload"></i>
                                            </label>
                                            <div className="preview-image"
                                                style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                                onClick={() => this.openPreviewImage()}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="button">
                                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn-edit" : "btn-save"}
                                                onClick={this.handleSaveLocation}>
                                                {
                                                    this.state.action === CRUD_ACTIONS.EDIT ?
                                                        <FormattedMessage id="manage-user.edit" />
                                                        :
                                                        <FormattedMessage id="manage-user.save" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="location-list-scroll-area">
                    <LocationList
                    handleButtonEditLocation={this.handleButtonEditLocation}
                    action={this.state.action}
                    />
                </div>
            </div>
                        
        );
    }

}

const mapStateToProps = state => {
    return {
        listLocations: state.admin.locations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewLocation: (data) => dispatch(actions.createNewLocation(data)),
        fetchLocationRedux: () => dispatch(actions.fetchAllLocationsStart()),
        editLocation: (data) => dispatch(actions.editLocation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarForm);
