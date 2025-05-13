import React, { Component} from "react";
import { connect } from "react-redux";
import './CarList.scss'
import * as caractions from '../../../../store/actions/adminActions/carActions';
class CarList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carsRedux: [],
            statusArr: [],
            statusId: '',
            priceArr: [],
            selectedPrice: '',
        }
    }

    async componentDidMount() {
         this.props.fetchCarRedux();
         this.props.getStatusStart();
         this.props.fetchAllPriceStart();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCars !== this.props.listCars){
            this.setState ({
                carsRedux: this.props.listCars
            })
        }
        if(prevProps.statusRedux !== this.props.statusRedux){
            let arrStatus = this.props.statusRedux;
            this.setState({
                statusArr: arrStatus,
                statusId: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : ''
            });
        }

        if (prevProps.pricesRedux !== this.props.pricesRedux) {
            this.setState({
                priceArr: this.props.pricesRedux
            });
        }
    }

    handlePriceChange = (e) => {
        const selectedPrice = e.target.value;
        this.setState({selectedPrice});
        if(selectedPrice) {
            this.props.fetchAllCarByPriceStart(selectedPrice);
        } else {
            this.props.fetchCarRedux();
        }
    }
    handleEditCar = (car) => {
        this.props.handleButtonEditCar(car)
    }

    handleDeleteCar = (car) => {
        this.props.deleteCar(car.id)
    }
    render() {
        const { carsRedux, priceArr, selectedPrice, statusArr } = this.state;
        console.log('check price: ', this.state);
        return (
            <React.Fragment>
                <div className="filter-container">
                    <label htmlFor="price-select">Chọn giá thuê:</label>
                    <select
                        className="form-control"
                        onChange={this.handlePriceChange}
                        value={selectedPrice}
                    >
                        <option value="">-- Tất cả --</option>
                        {priceArr && priceArr.length > 0 &&
                            priceArr.map((item, index) => (
                                <option key={index} value={item.price_of_day}>
                                    {item.price_of_day} VND
                                </option>
                            ))
                        }
                    </select>
                </div>
            <table id = "CarList">
                <tbody>
                <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Tên tô tô</th>
                    <th>Biển số xe</th>
                    <th>Thương hiệu</th>
                    <th>Trạng thái</th>
                    <th>Giá thuê</th>
                    <th>Xử lý</th>
                </tr>
                {
                    carsRedux && carsRedux.length > 0 && carsRedux.map((item, index) => {
                        let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                        return (
                            <tr key= {index}>
                                <td>{index + 1}</td>
                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                    {imageBase64 ? (
                                        <div className="img" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                    ) : (
                                        <div className="img no-image">No Image</div>
                                    )}
                                </td>
                                <td>{item.name_car}</td>
                                <td>{item.license_plate}</td>
                                <td>{item.brand}</td>
                                <td>
                                {statusArr.find(status => status.keyMap === item.status_id)?.valueVi || 'Không xác định'}
                                </td>

                                <td>{item.price_of_day}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => this.handleEditCar(item)}><i className="fas fa-solid fa-pencil-alt"></i></button>
                                    <button className="btn-delete" onClick={() => this.handleDeleteCar(item)}><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listCars: state.admin.cars,
        statusRedux: state.admin.status,
        pricesRedux: state.admin.prices,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       fetchCarRedux: () => dispatch(caractions.fetchAllCarsStart()),
       deleteCar: (id) => dispatch(caractions.deleteCar(id)),
       getStatusStart: () => dispatch(caractions.fetchStatusStart()),
       fetchAllPriceStart: () => dispatch(caractions.fetchAllPriceStart()),
       fetchAllCarByPriceStart: (price) => dispatch(caractions.fetchAllCarByPriceStart(price)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarList);