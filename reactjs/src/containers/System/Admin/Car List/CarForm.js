
import React, { Component} from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from '../../../../store/actions';
import { CommonUtils, CRUD_ACTIONS } from "../../../../utils";
import './CarForm.scss'
import CarList from "./CarList";
class CarForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeArr: [],
            statusArr: [],
            previewImgUrl: '',

            nameCar: '',
            avatar: '',
            licensePlate: '',
            typeId: '',
            brand: '',
            modelYear: '',
            priceOfDay: '',
            statusId: '',

            action: '',
            carIdEdit: '',
        }
    }

    async componentDidMount() {
        this.props.getTypeStart();
        this.props.getStatusStart();
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.typeRedux !== this.props.typeRedux) {
            let arrTypes = this.props.typeRedux;
            this.setState({
                typeArr: arrTypes,
                typeId: arrTypes && arrTypes.length > 0 ? arrTypes[0].keyMap : ''
            });
        }
        if(prevProps.statusRedux !== this.props.statusRedux){
            let arrStatus = this.props.statusRedux;
            this.setState({
                statusArr: arrStatus,
                statusId: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : ''
            });
        }
        if (prevProps.listCars !== this.props.listCars) {
            let arrTypes = this.props.typeRedux;
            let arrStatus = this.props.statusRedux;
            this.setState({
                nameCar: '',
                avatar: '',
                licensePlate: '',
                typeId: arrTypes && arrTypes.length > 0 ? arrTypes[0].keyMap : '',
                brand: '',
                modelYear: '',
                priceOfDay: '',
                statusId: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
            })
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
        let arrCheck = ['nameCar', 'licensePlate', 'typeId', 'brand', 'modelYear', 'priceOfDay', 'statusId'];
    
        // Chỉ kiểm tra avatar nếu là CREATE
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
        if(isValid === false) return;
        let {action} = this.state;

        if(action === CRUD_ACTIONS.CREATE) {
            this.props.createNewCar({
                name_car: this.state.nameCar,
                image: this.state.avatar,
                license_plate: this.state.licensePlate,
                type_id: this.state.typeId,
                brand: this.state.brand,
                model_year: this.state.modelYear,
                price_of_day: this.state.priceOfDay,
                status_id: this.state.statusId,
            })
        }

        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editCar({
                id: this.state.carIdEdit,
                name_car: this.state.nameCar,
              //  image: this.state.avatar,
                license_plate: this.state.licensePlate,
                type_id: this.state.typeId,
                brand: this.state.brand,
                model_year: this.state.modelYear,
                price_of_day: this.state.priceOfDay,
                status_id: this.state.statusId,
                avatar: this.state.avatar
            })
        }
    }

    handleButtonEditCar = (car) => {
        let imageBase64 = '';
        if(car.image){
            imageBase64 = new Buffer(car.image, 'base64').toString('binary');
        }

        this.setState ({
            nameCar: car.name_car,
           // image: '',
            licensePlate: car.license_plate,
            typeId: car.type_id,
            brand: car.brand,
            modelYear: car.model_year,
            priceOfDay: car.price_of_day,
            statusId: car.status_id,
            action: CRUD_ACTIONS.EDIT,
            previewImgUrl: imageBase64,
            carIdEdit: car.id,
            avatar: '',
            
        })
    }

    render() {
        let types = this.state.typeArr;
        let status = this.state.statusArr;
        let {
                nameCar,
                avatar,
                licensePlate,
                typeId,
                brand,
                modelYear,
                priceOfDay,
                statusId,
        } = this.state;
        console.log('thanh luong check prop : ', this.state)
        return (
            <div className="car-redux-container">
                <div className="title">
                    Quản lý ô tô 
                </div>
                <div className="car-redux-body">
                    <div className="row input-text">
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
                            <input type="text" className="form-control"/>
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
                        

                        <div className="col-12">
                            <button className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-edit":"btn btn-save"}
                            onClick={() => this.handleSaveCar()}>
                                {
                                    this.state.action === CRUD_ACTIONS.EDIT ?
                                    <FormattedMessage id= "manage-user.edit"/>
                                    :
                                    <FormattedMessage id= "manage-user.save"/>
                                }
                            </button>
                        </div>

                         <div className="col-12 mb-5">
                            <CarList
                            handleButtonEditCar={this.handleButtonEditCar}
                            action={this.state.action}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        typeRedux: state.admin.types,
        statusRedux: state.admin.status,
        listCars: state.admin.cars,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       getTypeStart: () => dispatch(actions.fetchTypeStart()),
       getStatusStart: () => dispatch(actions.fetchStatusStart()),
       createNewCar: (data) => dispatch(actions.createNewCar(data)),
       fetchCarRedux: () => dispatch(actions.fetchAllCarsStart()),
       editCar: (data) => dispatch(actions.editCar(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarForm);
