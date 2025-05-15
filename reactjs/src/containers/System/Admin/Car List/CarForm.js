import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from '../../../../store/actions/adminActions/carActions';
import * as locationsactions from '../../../../store/actions/adminActions/locationActions';
import { CommonUtils, CRUD_ACTIONS } from "../../../../utils";
import './CarForm.scss'
import CarList from "./CarList";
import { toast } from "react-toastify";

class CarForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeArr: [],
            statusArr: [],
            locationArr: [],
            previewImgUrl: '',

            nameCar: '',
            avatar: '',
            licensePlate: '',
            typeId: '',
            brand: '',
            modelYear: '',
            priceOfDay: '',
            statusId: '',
            locationId: '',

            action: '',
            carIdEdit: '',
            showForm: false, // 👈 new flag
        };
    }

    async componentDidMount() {
        this.props.getTypeStart();
        this.props.getStatusStart();
        this.props.fetchLocationRedux();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.typeRedux !== this.props.typeRedux) {
            let arrTypes = this.props.typeRedux;
            this.setState({
                typeArr: arrTypes,
                typeId: arrTypes && arrTypes.length > 0 ? arrTypes[0].keyMap : ''
            });
        }

        if (prevProps.statusRedux !== this.props.statusRedux) {
            let arrStatus = this.props.statusRedux;
            this.setState({
                statusArr: arrStatus,
                statusId: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : ''
            });
        }

        if (prevProps.listLocations !== this.props.listLocations && this.props.listLocations.length > 0) {
            const firstId = this.props.listLocations[0].id;
            this.setState({
                locationArr: this.props.listLocations,
                locationId: firstId,
            });
        }

        if (prevProps.listCars !== this.props.listCars) {
            let arrTypes = this.props.typeRedux;
            let arrStatus = this.props.statusRedux;
            let arrLocation = this.props.listLocations;
            this.setState({
                nameCar: '',
                avatar: '',
                licensePlate: '',
                typeId: arrTypes && arrTypes.length > 0 ? arrTypes[0].keyMap : '',
                locationId: arrLocation && arrLocation.length > 0 ? arrLocation[0].id : '',
                brand: '',
                modelYear: '',
                priceOfDay: '',
                statusId: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
                showForm: false,
            });
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
        let arrCheck = ['nameCar', 'licensePlate', 'typeId', 'brand', 'modelYear', 'locationId', 'priceOfDay', 'statusId'];
    
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

    handleSaveCar = () => {
        let isValid = this.checkValidateInput();
        if (!isValid) return;

        const {
            nameCar, avatar, licensePlate, typeId, brand, modelYear,
            locationId, priceOfDay, statusId, carIdEdit, action
        } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewCar({
                name_car: nameCar,
                image: avatar,
                license_plate: licensePlate,
                type_id: typeId,
                brand,
                model_year: modelYear,
                location_id: locationId,
                price_of_day: priceOfDay,
                status_id: statusId,
            });
        }

        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editCar({
                id: carIdEdit,
                name_car: nameCar,
                license_plate: licensePlate,
                type_id: typeId,
                brand,
                model_year: modelYear,
                location_id: locationId,
                price_of_day: priceOfDay,
                status_id: statusId,
                avatar
            });
        }

        this.setState({ showForm: false });
    };

    handleButtonEditCar = (car) => {
        let imageBase64 = '';
        if(car.image){
            imageBase64 = new Buffer(car.image, 'base64').toString('binary');
        }
        this.setState({
            nameCar: car.name_car,
            licensePlate: car.license_plate,
            typeId: car.type_id,
            brand: car.brand,
            modelYear: car.model_year,
            locationId: car.location_id,
            priceOfDay: car.price_of_day,
            statusId: car.status_id,
            action: CRUD_ACTIONS.EDIT,
            previewImgUrl: imageBase64,
            carIdEdit: car.id,
            avatar: '',
            showForm: true
        });
    };
    handleCancel = () => {
        let arrTypes = this.props.typeRedux;
        let arrStatus = this.props.statusRedux;
        let arrLocation = this.props.listLocations;
        this.setState({
            nameCar: '',
            avatar: '',
            licensePlate: '',
            typeId: arrTypes && arrTypes.length > 0 ? arrTypes[0].keyMap : '',
            brand: '',
            modelYear: '',
            priceOfDay: '',
            statusId: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : '',
            locationId: arrLocation && arrLocation.length > 0 ? arrLocation[0].id : '',
            previewImgUrl: '',
            carIdEdit: '',
            action: CRUD_ACTIONS.CREATE,
            showForm: false
        });
    }
    render() {

        let types = this.props.typeRedux;
        let status = this.props.statusRedux;
        let location = this.props.listLocations;

        let {
                nameCar,
                avatar,
                licensePlate,
                typeId,
                brand,
                modelYear,
                priceOfDay,
                statusId, 
                locationId
        } = this.state;
        
        console.log('thanh luong check prop : ', this.state)
        return (
            
            <div className="car-redux-container">
                <div className="title">Quản lý ô tô</div>

                <div className="mb-2">
                    <button
                        className="btn-add"
                        onClick={() => this.setState({
                            action: CRUD_ACTIONS.CREATE,
                            showForm: true,
                            nameCar: '',
                            licensePlate: '',
                            typeId: types && types.length > 0 ? types[0].keyMap : '',
                            brand: '',
                            modelYear: '',
                            priceOfDay: '',
                            statusId: status && status.length > 0 ? status[0].keyMap : '',
                            locationId: location && location.length > 0 ? location[0].id : '',
                            avatar: '',
                            previewImgUrl: '',
                            carIdEdit: '',
                        })}
                    >
                    Thêm xe mới
                    </button>
                </div>

                {this.state.showForm && (
                    <div className="car-form-overlay">
                        <div className="car-form-content">
                            <div className="row input-text">
                                <div className="title-car"><span className="titlecar">Thông tin xe</span></div>
                                <div className="button">
                                    <span className="btn-secondary"
                                    onClick={this.handleCancel}><i className="fas fa-times"></i></span>
                                </div>
                                <div className="col-6">
                                <label>Tên ô tô</label>
                                <input type="text" className="form-control"
                                value={nameCar}
                                onChange={(event) => {this.onChangeInput(event, 'nameCar')}}/>
                            </div>
                            <div className="col-6">
                                <label>Biển số xe</label>
                                <input type="text" className="form-control"
                                value={licensePlate}
                                onChange={(event) => {this.onChangeInput(event, 'licensePlate')}}/>
                            </div>
                            <div className="col-6">
                                <label>Loại xe</label>
                                <select className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, 'typeId')}}
                                    value={typeId}>
                                        {types && types.length > 0 && 
                                            types.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })
                                        }
                                        
                                </select>
                            </div>
                            <div className="col-6">
                                <label>Thương hiệu</label>
                                <input type="text" className="form-control"
                                value={brand}
                                onChange={(event) => {this.onChangeInput(event, 'brand')}}/>
                            </div>
                            <div className="col-6">
                                <label>Năm sản xuất</label>
                                <input type="text" className="form-control"
                                value={modelYear}
                                onChange={(event) => {this.onChangeInput(event, 'modelYear')}}/>
                            </div>
                            <div className="col-6">
                                <label>Địa chỉ</label>
                                <select
                                    className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'locationId')}
                                    value={locationId}
                                >
                                    {this.state.locationArr && this.state.locationArr.length > 0 &&
                                        this.state.locationArr.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.name_location}
                                            </option>
                                        ))
                                    }
                                </select>

                            </div>
                            <div className="col-6">
                                <label>Giá thuê theo ngày</label>
                                <input type="text" className="form-control"
                                value={priceOfDay}
                                onChange={(event) => {this.onChangeInput(event, 'priceOfDay')}}/>
                            </div>
                            <div className="col-6">
                                <label>Trạng thái</label>
                                <select className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, 'statusId')}}
                                    value={statusId}>
                                        {status && types.length > 0 && 
                                            status.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })
                                        }
                                        
                                </select>
                            </div>
                            <div className="col-6">
                                <label>Ảnh</label>
                                <div className="img-container">
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
                                    {this.props.errorMessage && (
                                <div style={{ color: 'red', marginTop: '10px' }}>
                                    {this.props.errorMessage} {/* Lỗi từ backend */}
                                </div>
                            )}

                                <div className="col-12 mt-3">
                                    <div className="button">
                                        <button
                                            className={this.state.action === CRUD_ACTIONS.EDIT ? " btn-edit" : " btn-save"}
                                            onClick={this.handleSaveCar}
                                        >
                                            {
                                                this.state.action === CRUD_ACTIONS.EDIT ?
                                                    <FormattedMessage id="manage-user.edit" /> :
                                                    <FormattedMessage id="manage-user.save" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="car-list-scroll-area">
                    <CarList
                        handleButtonEditCar={this.handleButtonEditCar}
                        action={this.state.action}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    typeRedux: state.admin.types,
    statusRedux: state.admin.status,
    listCars: state.admin.cars,
    listLocations: state.admin.locations
});

const mapDispatchToProps = dispatch => ({
    getTypeStart: () => dispatch(actions.fetchTypeStart()),
    getStatusStart: () => dispatch(actions.fetchStatusStart()),
    createNewCar: (data) => dispatch(actions.createNewCar(data)),
    fetchCarRedux: () => dispatch(actions.fetchAllCarsStart()),
    editCar: (data) => dispatch(actions.editCar(data)),
    fetchLocationRedux: () => dispatch(locationsactions.fetchAllLocationsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarForm);
