import React, { Component } from "react";
import { connect } from "react-redux";
import * as caractions from '../../../store/actions/adminActions/carActions';
import './HomeListCar.scss';
import { withRouter } from 'react-router-dom';
import FormRentalCar from '../../System/Staff/formRentalCar';

class HomeListCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCar: [],
            visibleRows: 4,
            selectedCar: null,
        };
    }

    async componentDidMount() {
        this.props.fetchCarRedux();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.listcars !== this.props.listcars) {
            this.setState({ dataCar: this.props.listcars });
        }
    }

    loadMoreCars = () => {
        this.setState(prevState => ({
            visibleRows: prevState.visibleRows + 4,
        }));
    }

    handleRentalClick = (car, event) => {
        event.stopPropagation();
        const {userInfo, history} = this.props;

        if(userInfo) {
            this.setState({ selectedCar: car });
        } else {
            if(history) {
                history.push('/login')
            }
        }
    };

    handleViewDetailCar = (car) => {
        if (this.props.history) {
            this.props.history.push(`/detail-car/${car.id}`);
        }
    };

    render() {
        const { dataCar, visibleRows, selectedCar } = this.state;
        const columnsPerRow = 4;
        const carsPerPage = visibleRows * columnsPerRow;
        const visibleCars = dataCar.slice(0, carsPerPage);

        return (
            <div className="section-listcarhome">
                <div className="title-car">Danh sách ô tô</div>
                <div className="section-container">
                    <div className="car-grid">
                        {visibleCars.map((item, index) => {
                            let imageBase64 = item.image ? new Buffer(item.image, 'base64').toString('binary') : '';
                            return (
                                <div className="car-item" key={index} onClick={() => this.handleViewDetailCar(item)}>
                                    <div className="bg-image" style={{ backgroundImage: `url(${imageBase64})` }} />
                                    <div className="infomation-car">
                                        <div className="car-name">{item.name_car}</div>
                                        <div className="price">Giá thuê: {item.price_of_day} / ngày</div>
                                    </div>
                                    <div className="rental-car">
                                        <button
                                            className="rental"
                                            onClick={(e) => this.handleRentalClick(item, e)}
                                        >
                                            Thuê xe
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {carsPerPage < dataCar.length && (
                        <div className="load-more-container">
                            <button className="load-more-button" onClick={this.loadMoreCars}>
                                Xem thêm
                            </button>
                        </div>
                    )}
                </div>
                {selectedCar && (
                    <div className="rental-form-overlay">
                        <FormRentalCar
                            car={selectedCar}
                            onClose={() => this.setState({ selectedCar: null })}
                        />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listcars: state.admin.cars,
    userInfo: state.user.userInfo,
});

const mapDispatchToProps = dispatch => ({
    fetchCarRedux: () => dispatch(caractions.fetchAllCarsStart()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeListCar));
