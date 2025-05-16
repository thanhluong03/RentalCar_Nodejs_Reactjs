import React, { Component } from "react";
import { connect } from "react-redux";
import * as caractions from '../../../store/actions/adminActions/carActions';
import * as caractionscustomer from '../../../store/actions/customerActions/carActions';
import './SearchCar.scss';
import queryString from 'query-string';
import HomeHeader from "../../HomePage/HomeHeader";

class SearchCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCar: [],
            originalDataCar: [],
            filterStep: 'filter-type',
            selectedFilterValue: 'filter',
            priceRanges: [
                { label: 'Dưới 500,000 VND', value: 'under-500' },
                { label: '500,000 - 1,000,000 VND', value: '500-1000' },
                { label: '1,000,000 - 1,500,000 VND', value: '1000-1500' },
                { label: 'Trên 1,500,000 VND', value: 'above-1500' }
            ]
        };
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        const keyword = parsed.keyword || '';
        if (keyword) {
            this.props.fetchSearchCar(keyword);
        } else {
            this.props.fetchCarRedux();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchResults !== this.props.searchResults) {
            if (Array.isArray(this.props.searchResults) && this.props.searchResults.length > 0) {
                this.setState({ 
                    dataCar: this.props.searchResults,
                    originalDataCar: this.props.searchResults,
                });
            }
        }

        if (prevProps.listcars !== this.props.listcars) {
            if (!this.props.searchResults || this.props.searchResults.length === 0) {
                this.setState({ 
                    dataCar: this.props.listcars,
                    originalDataCar: this.props.listcars,
                });
            }
        }

        if (prevProps.location.search !== this.props.location.search) {
            const parsed = queryString.parse(this.props.location.search);
            const keyword = parsed.keyword || '';

            if (keyword) {
                this.props.fetchSearchCar(keyword);
            } else {
                this.props.fetchCarRedux();
            }
        }
    }

    handleSelectChange = (e) => {
        const value = e.target.value;
        const { filterStep, originalDataCar } = this.state;

        if (value === "filter") {
            this.setState({
                filterStep: "filter-type",
                selectedFilterValue: "filter",
                dataCar: originalDataCar,
            });
            return;
        }

        if (filterStep === "filter-type") {
            if (value === "price") {
                this.setState({
                    filterStep: value,
                    selectedFilterValue: "filter",
                });
            }
        } else if (filterStep === "price") {
            this.setState({ selectedFilterValue: value });

            let filteredCars = [];

            switch (value) {
                case "under-500":
                    filteredCars = originalDataCar.filter(car => car.price_of_day < 500000);
                    break;
                case "500-1000":
                    filteredCars = originalDataCar.filter(car => car.price_of_day >= 500000 && car.price_of_day <= 1000000);
                    break;
                case "1000-1500":
                    filteredCars = originalDataCar.filter(car => car.price_of_day > 1000000 && car.price_of_day <= 1500000);
                    break;
                case "above-1500":
                    filteredCars = originalDataCar.filter(car => car.price_of_day > 1500000);
                    break;
                default:
                    filteredCars = originalDataCar;
            }

            this.setState({ dataCar: filteredCars });
        }
    };

    render() {
        const { dataCar, priceRanges, filterStep, selectedFilterValue } = this.state;
        const isLoading = dataCar.length === 0;

        let options = [];
        if (filterStep === "filter-type") {
            options = [
                { value: "filter", label: "-- CHỌN BỘ LỌC --" },
                { value: "price", label: "Lọc theo giá thuê" },
                { value: "brand", label: "Lọc theo thương hiệu" }, // chưa hỗ trợ
            ];
        } else if (filterStep === "price") {
            options = [
                { value: "filter", label: "-- CHỌN KHOẢNG GIÁ --" },
                ...priceRanges
            ];
        }

        return (
            <>
                <HomeHeader/>
                <div className="section-listcarhome">
                    <div className="section-all-selectfilter">
                        <div className="title-car">Kết quả tìm kiếm ô tô</div>
                        <div className="section-selectfilter">
                            <select
                                className="selectfilter"
                                onChange={this.handleSelectChange}
                                value={selectedFilterValue}
                            >
                                {options.map((opt, idx) => (
                                    <option key={idx} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="section-container">
                        <div className="car-grid-container">
                            {isLoading ? (
                                <div className="loading-container">Đang tải...</div>
                            ) : dataCar.length > 0 ? (
                                <div className="car-grid">
                                    {dataCar.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }

                                        return (
                                            <div className="car-item" key={index}>
                                                <div
                                                    className="bg-image"
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                />
                                                <div className="infomation-car">
                                                    <div className="car-name">Tên xe: {item.name_car}</div>
                                                    <div className="price">Giá thuê: {item.price_of_day} / ngày</div>
                                                </div>
                                                <div className="rental-car">
                                                    <button className="rental">Thuê xe</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div>Không tìm thấy ô tô phù hợp.</div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    listcars: state.admin.cars,
    searchResults: state.user.cars,
});

const mapDispatchToProps = dispatch => ({
    fetchCarRedux: () => dispatch(caractions.fetchAllCarsStart()),
    fetchSearchCar: (keyword) => dispatch(caractionscustomer.fetchSearchCar(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCar);
