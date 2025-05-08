import React, { Component} from "react";
import { connect } from "react-redux";
import './CarList.scss'
import *  as actions from "../../../../store/actions";
import { FormattedMessage } from "react-intl";
class CarList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carsRedux: []
        }
    }

     componentDidMount() {
        this.props.fetchCarRedux();
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCars !== this.props.listCars){
            this.setState ({
                carsRedux: this.props.listCars
            })

        }
    }

    
    handleEditCar = (car) => {
        this.props.handleButtonEditCar(car)
    }

    handleDeleteCar = (car) => {
        this.props.deleteCar(car.id)
    }
    render() {
        let arrCars = this.state.carsRedux;
        console.log('fjgfkg', arrCars)
        return (
            <React.Fragment>
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
                    arrCars && arrCars.length > 0 && arrCars.map((item, index) => {
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
                                <td>{item.status_id}</td>
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
        listCars: state.admin.cars
    };
};

const mapDispatchToProps = dispatch => {
    return {
       fetchCarRedux: () => dispatch(actions.fetchAllCarsStart()),
       deleteCar: (id) => dispatch(actions.deleteCar(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
