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
            currentPage: 1,
            carsPerPage: 20,
            selectedCar: null,
        };
        this.carListRef = React.createRef();
    }

    async componentDidMount() {
        this.props.fetchCarRedux();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.listcars !== this.props.listcars) {
            this.setState({ dataCar: this.props.listcars, currentPage: 1 });
        }
    }

    handleRentalClick = (car, event) => {
        event.stopPropagation();
        const { userInfo, history } = this.props;
        if (userInfo) {
            this.setState({ selectedCar: car });
        } else {
            history.push('/login');
        }
    };

    handleViewDetailCar = (car) => {
        this.props.history.push(`/detail-car/${car.id}`);
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page }, () => {
            if (this.carListRef.current) {
                this.carListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    };

renderPagination = () => {
        const { currentPage, carsPerPage, dataCar } = this.state;
        const totalPages = Math.ceil(dataCar.length / carsPerPage);
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 4) pages.push("...");

            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }

            if (currentPage < totalPages - 3) pages.push("...");

            pages.push(totalPages);
        }

        return (
            <div className="pagination-container">
                <button
                    className="pagination-arrow"
                    disabled={currentPage === 1}
                    onClick={() => this.handlePageChange(currentPage - 1)}
                >
                    ‹
                </button>

                {pages.map((page, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                        onClick={() => typeof page === 'number' && this.handlePageChange(page)}
                        disabled={page === "..."}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="pagination-arrow"
                    disabled={currentPage === totalPages}
                    onClick={() => this.handlePageChange(currentPage + 1)}
                >
                    ›
                </button>
            </div>
        );
    };
    render() {
        const { dataCar, currentPage, carsPerPage, selectedCar } = this.state;
        const startIndex = (currentPage - 1) * carsPerPage;
        const visibleCars = dataCar.slice(startIndex, startIndex + carsPerPage);

        return (
            <div className="section-listcarhome">
                <div className="header-bar">
                    <div className="title-car">Danh sách ô tô</div>
                </div>

                <div className="section-container" ref={this.carListRef}>
                    <div className="car-grid">
                        {visibleCars.map((item, index) => {
                            let imageBase64 = item.image
                                ? Buffer.from(item.image, 'base64').toString('binary')
                                : '';
                            return (
                                <div className="car-item" key={index} onClick={() => this.handleViewDetailCar(item)}>
                                    <div className="bg-image" style={{ backgroundImage: `url(${imageBase64})` }} />
                                    <div className="infomation-car">
                                        <div className="car-name">{item.name_car}</div>
                                        <div className="price">Giá thuê: {item.price_of_day} / ngày</div>
                                    </div>
                                    <div className="rental-car">
                                        <button className="rental" onClick={(e) => this.handleRentalClick(item, e)}>
                                            Thuê xe
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {selectedCar && (
                    <div className="rental-form-overlay">
                        <FormRentalCar
                            car={selectedCar}
                            onClose={() => this.setState({ selectedCar: null })}
                        />
                    </div>
                )}
                {dataCar.length > carsPerPage && this.renderPagination()}
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