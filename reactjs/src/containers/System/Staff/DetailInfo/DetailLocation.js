import React, { Component } from "react";
import { connect } from 'react-redux';
import { getAllCarByLocations } from '../../../../services/userService';
import HomeHeader from "../../../HomePage/HomeHeader";
import HomeFooter from "../../../HomePage/HomeFooter";
import './DetailLocation.scss';
import FormRentalCar from "../formRentalCar"
class DetailLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalCarList: [],
            carList: [],
            currentLocationId: null,
            locationName: '',
            isLoading: true,
            showFilterForm: false,
            selectedFilterValue: '',
            selectedBrands: [],
            brandArr: [],
            selectedCar: null,
            currentPage: 1,
            carsPerPage: 20,
        };
        this.carLocationListRef = React.createRef();
    }

    async componentDidMount() {
        if (this.props.match?.params?.location_id) {
            const id = this.props.match.params.location_id;
            this.setState({ currentLocationId: id, isLoading: true });

            let res = await getAllCarByLocations(id);
            if (res && res.errCode === 0) {
                const carList = res.data || [];
                let locationName = '';

                if (carList.length > 0 && carList[0].Location) {
                    locationName = carList[0].Location.name_location;
                }

                const brands = Array.from(new Set(carList.map(car => car.brand).filter(Boolean)));

                this.setState({
                    carList,
                    originalCarList: carList,
                    locationName,
                    brandArr: brands,
                    isLoading: false
                });
            } else {
                this.setState({ isLoading: false });
            }
        }
    }

    handleViewDetailCar = (car) => {
        this.props.history.push(`/detail-car/${car.id}`);
    };

    toggleFilterForm = () => {
        this.setState({ showFilterForm: true });
    };

    handleCancelFilter = () => {
        this.setState({
            showFilterForm: false,
            selectedBrands: [],
            selectedFilterValue: '',
            carList: this.state.originalCarList
        });
    };

    handlePriceToggle = (value) => {
        this.setState(prev => ({
            selectedFilterValue: prev.selectedFilterValue === value ? '' : value
        }));
    };

    handleBrandCheckboxChange = (e) => {
        const brand = e.target.value;
        const { selectedBrands } = this.state;

        if (selectedBrands.includes(brand)) {
            this.setState({ selectedBrands: selectedBrands.filter(b => b !== brand) });
        } else {
            this.setState({ selectedBrands: [...selectedBrands, brand] });
        }
    };

    handleFilterSubmit = (e) => {
        e.preventDefault();
        const { selectedFilterValue, selectedBrands, originalCarList } = this.state;
        let filteredCars = [...originalCarList];

        switch (selectedFilterValue) {
            case "under-500":
                filteredCars = filteredCars.filter(car => car.price_of_day < 500000);
                break;
            case "500-2000":
                filteredCars = filteredCars.filter(car => car.price_of_day >= 500000 && car.price_of_day <= 2000000);
                break;
            case "2000-3500":
                filteredCars = filteredCars.filter(car => car.price_of_day > 2000000 && car.price_of_day <= 3500000);
                break;
            case "above-3500":
                filteredCars = filteredCars.filter(car => car.price_of_day > 3500000);
                break;
            default:
                break;
        }

        if (selectedBrands.length > 0) {
            filteredCars = filteredCars.filter(car => selectedBrands.includes(car.brand));
        }

        this.setState({ carList: filteredCars, showFilterForm: false });
    };

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

    handlePageChange = (page) => {
        this.setState({ currentPage: page }, () => {
            if (this.carLocationListRef.current) {
                this.carLocationListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    };

renderPagination = () => {
        const { currentPage, carsPerPage, carList } = this.state;
        const totalPages = Math.ceil(carList.length / carsPerPage);
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
        const {
            carList, carsPerPage, currentPage, locationName, isLoading,
            showFilterForm, selectedFilterValue, selectedBrands, brandArr, selectedCar
        } = this.state;

        const startIndex = (currentPage - 1) * carsPerPage;
        const visibleCars = carList.slice(startIndex, startIndex + carsPerPage);

        return (
            <>
                <HomeHeader ref ={this.carLocationListRef}/>
                <div className="detail-location-container">
                    <div className="section-listcarhome">
                        <div className="section-all-selectfilter-search">
                            <div className="title-car">Danh sách ô tô tại: {locationName || 'Địa điểm không xác định'}</div>
                            <div className="filter-button">
                                <button className="buton-filter" onClick={this.toggleFilterForm}>Lọc</button>
                            </div>
                        </div>

                        {showFilterForm && (
                            <div className="filter-popup-overlay" onClick={this.handleCancelFilter}>
                                <form
                                    className="price-filter-form"
                                    onSubmit={this.handleFilterSubmit}

                                    onClick={e => e.stopPropagation()} 
                                >
                                    <h2>Tất cả bộ lọc</h2>

                                    <h3>Thương hiệu</h3>
                                    <div className="brand-checkbox-group">
                                        {brandArr.map((brand, index) => (
                                            <div key={index} className="brand-checkbox-item">
                                                <input
                                                    type="checkbox"
                                                    id={`brand-${index}`}
                                                    value={brand}
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={this.handleBrandCheckboxChange}
                                                />
                                                <label htmlFor={`brand-${index}`}>{brand}</label>
                                            </div>
                                        ))}
                                    </div>

                                    <h3>Giá</h3>
                                    <div className="price-button-group">
                                        {[
                                            { id: 'under-500', label: 'Dưới 500,000' },
                                            { id: '500-2000', label: '500,000 - 2,000,000' },
                                            { id: '2000-3500', label: '2,000,000 - 3,500,000' },
                                            { id: 'above-3500', label: 'Trên 3,500,000' }
                                        ].map(opt => (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                className={`price-toggle-button ${selectedFilterValue === opt.id ? 'active' : ''}`}
                                                onClick={() => this.handlePriceToggle(opt.id)}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="form-buttons">
                                        <button type="submit">Áp dụng lọc</button>
                                        <button type="button" onClick={this.handleCancelFilter}>Hủy</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="section-container">
                            <div className="car-grid-container">
                                {isLoading ? (
                                    <div className="loading-container">Đang tải...</div>
                                ) : visibleCars.length > 0 ? (
                                    <div className="car-grid">
                                        {visibleCars.map((item, index) => {
                                            let imageBase64 = '';
                                            if (item.image) {
                                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                            }

                                            return (
                                                <div className="car-item" key={index} onClick={() => this.handleViewDetailCar(item)}>
                                                    <div
                                                        className="bg-image"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                    <div className="infomation-car">
                                                        <div className="car-name">{item.name_car}</div>
                                                        <div className="price">Giá thuê: {item.price_of_day.toLocaleString('vi-VN')} / ngày</div>
                                                    </div>
                                                    <div className="rental-car">
                                                        <button className="rental" onClick={(e) => this.handleRentalClick(item, e)}>Thuê xe</button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div>Không có dữ liệu</div>
                                )}
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
                            {carList.length > carsPerPage && this.renderPagination()}
                    </div>
                    </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.user.userInfo
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailLocation);
