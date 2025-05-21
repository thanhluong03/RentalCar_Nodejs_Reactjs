import React, { Component } from "react";
import { connect } from "react-redux";
import * as caractions from '../../../store/actions/adminActions/carActions';
import * as caractionscustomer from '../../../store/actions/customerActions/carActions';
import './SearchCar.scss';
import queryString from 'query-string';
import HomeHeader from "../../HomePage/HomeHeader";
import FormRentalCar from "../Staff/formRentalCar"
class SearchCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCar: [],
            originalDataCar: [],
            isLoading: true,
            selectedFilterValue: '',
            selectedBrands: [],
            keyword: '',
            showFilterForm: false,
            visibleRows: 4,
            selectedCar: null,
        };
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        const keyword = parsed.keyword || '';
        this.setState({ isLoading: true, keyword });

        if (keyword) {
            this.props.fetchSearchCar(keyword);
        } else {
            this.props.fetchCarRedux();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchResults !== this.props.searchResults) {
            if (Array.isArray(this.props.searchResults)) {
                const dynamicBrands = this.getBrandsFromCars(this.props.searchResults);
                this.setState({
                    dataCar: this.props.searchResults,
                    originalDataCar: this.props.searchResults,
                    brandArr: dynamicBrands,
                    isLoading: false,
                });
            }
        }

        if (prevProps.listcars !== this.props.listcars) {
            if (!this.props.searchResults || this.props.searchResults.length === 0) {
                const dynamicBrands = this.getBrandsFromCars(this.props.listcars);
                this.setState({
                    dataCar: this.props.listcars,
                    originalDataCar: this.props.listcars,
                    brandArr: dynamicBrands,
                    isLoading: false,
                });
            }
        }

        if (prevProps.location.search !== this.props.location.search) {
            const parsed = queryString.parse(this.props.location.search);
            const keyword = parsed.keyword || '';
            this.setState({ isLoading: true, keyword });
            if (keyword) {
                this.props.fetchSearchCar(keyword);
            } else {
                this.props.fetchCarRedux();
            }
        }
    }

    getBrandsFromCars = (cars) => {
        const brands = cars.map(car => car.brand).filter(Boolean);
        return Array.from(new Set(brands));
    };

    toggleFilterForm = () => {
        this.setState({ showFilterForm: true });
    };

    handleCancelFilter = () => {
        this.setState({ showFilterForm: false, selectedBrands: [], selectedFilterValue: '' });
    };

    handlePriceToggle = (value) => {
        const { selectedFilterValue } = this.state;
        if (selectedFilterValue === value) {
            this.setState({ selectedFilterValue: '' });
        } else {
            this.setState({ selectedFilterValue: value });
        }
    };

    handleBrandCheckboxChange = (e) => {
        const brand = e.target.value;
        const { selectedBrands } = this.state;

        if (selectedBrands.includes(brand)) {
            this.setState({
                selectedBrands: selectedBrands.filter(b => b !== brand)
            });
        } else {
            this.setState({
                selectedBrands: [...selectedBrands, brand]
            });
        }
    };

    handleFilterSubmit = (e) => {
        e.preventDefault();
        const { selectedFilterValue, selectedBrands, originalDataCar } = this.state;
        let filteredCars = originalDataCar;
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

        this.setState({ dataCar: filteredCars, showFilterForm: false });
    };

    loadMoreCars = () => {
        this.setState(prevSate => ({
            visibleRows: prevSate.visibleRows + 4,
        }))
    }

    handleViewDetailCar = (car) => {
        if (this.props.history) {
            this.props.history.push(`/detail-car/${car.id}`);
        }
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
    render() {
        const { dataCar, selectedFilterValue, selectedBrands, isLoading, keyword, showFilterForm, brandArr, visibleRows, selectedCar } = this.state;
        const columnsPerRow = 4;
        const carsPerPage = visibleRows * columnsPerRow;
        const visibleCars  = dataCar.slice(0, carsPerPage);
        return (
            <>
                <HomeHeader />
                <div className="section-listcar-search">
                    <div className="section-all-selectfilter-search">
                        <div className="title-car-search">
                            {keyword
                                ? <>Kết quả tìm kiếm: "<span className="keyword">{keyword}</span>"</>
                                : 'Tất cả ô tô hiện có'}
                        </div>
                        <div className="filter-button">
                            <button className="buton-filter" onClick={this.toggleFilterForm}>
                                Lọc
                            </button>
                        </div>
                    </div>

                    {showFilterForm && (
                        <div className="filter-popup-overlay" onClick={this.handleCancelFilter}>
                            <form
                                className="price-filter-form"
                                onSubmit={(e) => {
                                    e.stopPropagation();
                                    this.handleFilterSubmit(e);
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                <h2> Tất cả bộ lọc</h2>
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

                    <div className="section-container-search">
                        <div className="car-grid-container-search">
                            {isLoading ? (
                                <div className="loading-container-search">Đang tải...</div>
                            ) : visibleCars.length > 0 ? (
                                <div className="car-grid-search">
                                    {visibleCars.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                        }

                                        return (
                                            <div className="car-item-search" key={index} onClick={() => this.handleViewDetailCar(item)}>
                                                <div
                                                    className="bg-image-search"
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                />
                                                <div className="infomation-car-search">
                                                    <div className="car-name-search">Tên xe: {item.name_car}</div>
                                                    <div className="price-search">Giá thuê: {item.price_of_day} / ngày</div>
                                                </div>
                                                <div className="rental-car-search">
                                                    <button className="rental-search" onClick={(e) => this.handleRentalClick(item, e)}>Thuê xe</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="no-result-search">Không tìm thấy ô tô phù hợp.</div>
                            )}
                        </div>
                            {carsPerPage < dataCar.length && (
                                <div className="load-more-container-search">
                                    <button className="load-more-button-search" onClick={this.loadMoreCars}>
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
            </>
        );
    }
}

const mapStateToProps = state => ({
    listcars: state.admin.cars,
    searchResults: state.user.cars,
    userInfo: state.user.userInfo,
});

const mapDispatchToProps = dispatch => ({
    fetchCarRedux: () => dispatch(caractions.fetchAllCarsStart()),
    fetchSearchCar: (keyword) => dispatch(caractionscustomer.fetchSearchCar(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCar);

