import React, { Component } from "react";
import { connect } from "react-redux";
import * as caractions from '../../../store/actions/adminActions/carActions';
import './HomeListCar.scss';

class HomeListCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCar: [],
            priceArr: [],
            filterStep: 'filter-type',
            selectedFilterValue: '',
        };
    }

    async componentDidMount() {
        this.props.fetchCarRedux();
        this.props.fetchAllPriceRedux();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.listcars !== this.props.listcars) {
            this.setState({ dataCar: this.props.listcars });
        }

        if (prevProps.lisprices !== this.props.lisprices) {
            this.setState({ priceArr: this.props.lisprices });
        }
    }

    handleSelectChange = (e) => {
        const value = e.target.value;
        const { filterStep } = this.state;

        if (value === "filter") {
            this.setState({
                filterStep: "filter-type",
                selectedFilterValue: "filter",
            });
            this.props.fetchCarRedux(); 
            return;
        }

        if (filterStep === "filter-type") {
            if (value === "price") {
                this.setState({
                    filterStep: value,
                    selectedFilterValue: "filter",
                });
            }
        } else {
            this.setState({ selectedFilterValue: value });

            if (filterStep === "price") {
                this.props.fetchAllCarByPriceRedux(value);
            }
        }
    };

    render() {
        const { dataCar, priceArr, filterStep, selectedFilterValue } = this.state;
        const isLoading = dataCar.length === 0;

        let options = [];
        if (filterStep === "filter-type") {
            options = [
                { value: "filter", label: "-- CHỌN BỘ LỌC --" },
                { value: "price", label: "Lọc theo giá thuê" },
                { value: "brand", label: "Lọc theo thương hiệu" },
            ];
        } else if (filterStep === "price") {
            options = [
                { value: "filter", label: "-- CHỌN BỘ LỌC --" },
                ...priceArr.map(item => ({
                    value: item.price_of_day,
                    label: `${item.price_of_day} VND`,
                })),
            ];
        } 

        return (
            <div className="section-listcarhome">
                <div className="section-all-selectfilter">
                    <div className="title-car">Danh sách ô tô</div>
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
                            <div>Không có dữ liệu</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listcars: state.admin.cars,
    lisprices: state.admin.prices,
    //listbrands: state.admin.brands,
});

const mapDispatchToProps = dispatch => ({
    fetchCarRedux: () => dispatch(caractions.fetchAllCarsStart()),
    fetchAllPriceRedux: () => dispatch(caractions.fetchAllPriceStart()),
    //fetchAllBrandRedux: () => dispatch(caractions.fetchAllBrandStart()),
    fetchAllCarByPriceRedux: (price) => dispatch(caractions.fetchAllCarByPriceStart(price)),
    //fetchAllCarByBrandRedux: (brand) => dispatch(caractions.fetchAllCarByBrandStart(brand)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeListCar);
