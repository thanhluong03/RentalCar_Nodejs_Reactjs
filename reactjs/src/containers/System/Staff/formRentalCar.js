import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/customerActions/rentalCarActions';
import './FormRentalCar.scss';
import { toast } from "react-toastify";

class FormRentalCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_date: '',
            end_date: '',
            totalPrice: 0,
            deposit: 0,
            errorStartDate: '',
            errorEndDate: '',
        };
        this.endDateRef = React.createRef();
    }

    getTodayDate = () => {
        return new Date().toISOString().split("T")[0];
    }

    calculatePrice = (start_date, end_date) => {
        const { car } = this.props;
        if (!start_date || !end_date) {
            return { totalPrice: 0, deposit: 0 };
        }
        const start = new Date(start_date);
        const end = new Date(end_date);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) {
            return { totalPrice: 0, deposit: 0 };
        }
        const totalPrice = diffDays * car.price_of_day;
        const deposit = totalPrice * 0.2;
        return { totalPrice, deposit };
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            const { start_date, end_date } = this.state;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let errorStartDate = '';
            let errorEndDate = '';

            if (start_date && new Date(start_date) < today) {
                errorStartDate = 'Ngày bắt đầu không được trước ngày hiện tại';
            }

            if (end_date && new Date(end_date) < today) {
                errorEndDate = 'Ngày kết thúc không được trước ngày hiện tại';
            }

            if (!errorStartDate && start_date && end_date && new Date(end_date) <= new Date(start_date)) {
                errorEndDate = 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
            }

            if (errorEndDate && this.endDateRef.current) {
                this.endDateRef.current.focus();
            }

            if (errorStartDate || errorEndDate) {
                this.setState({
                    errorStartDate,
                    errorEndDate,
                    totalPrice: 0,
                    deposit: 0,
                });
                return;
            }

            const { totalPrice, deposit } = this.calculatePrice(start_date, end_date);
            this.setState({
                errorStartDate: '',
                errorEndDate: '',
                totalPrice,
                deposit
            });
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { start_date, end_date, totalPrice } = this.state;
        const { car, userInfo } = this.props;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!start_date || !end_date) {
            return alert("Vui lòng chọn ngày thuê");
        }

        if (new Date(start_date) < today) {
            return alert("Ngày bắt đầu không được trước ngày hiện tại");
        }

        if (new Date(end_date) < today) {
            return alert("Ngày kết thúc không được trước ngày hiện tại");
        }

        if (new Date(end_date) <= new Date(start_date)) {
            return alert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
        }

        if (!userInfo) {
            return alert("Bạn cần đăng nhập để thuê xe");
        }

        const data = {
            user_id: userInfo.id,
            car_id: car.id,
            start_date,
            end_date,
            total_price: totalPrice,
            deposit: totalPrice * 0.2,
            status_id: 'S3',
        };

        try {
            const response = await this.props.createNewRentalCar(data);
            if (response && response.errCode === 0) {
                this.props.onClose();
            } else {
                toast.error(this.props.errorMessage);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi kết nối đến máy chủ");
        }
    };

    render() {
        const { car, userInfo, onClose } = this.props;
        const { start_date, end_date, totalPrice, deposit, errorStartDate, errorEndDate } = this.state;

        return (
            <div className="form-modal">
                <div className="form-content">
                    <h2><strong>Thuê xe</strong></h2>
                    <h2>{car.name_car}</h2>
                    <p>Giá thuê: {car.price_of_day.toLocaleString()} VND/ngày</p>

                    {userInfo ? (
                        <div className="user-info">
                            <p><strong>Người thuê:</strong> {userInfo.last_name} {userInfo.first_name}</p>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                        </div>
                    ) : (
                        <p>Bạn cần đăng nhập để thuê xe.</p>
                    )}

                    <form onSubmit={this.handleSubmit}>
                        <label>Ngày bắt đầu:</label>
                            <input
                                type="date"
                                name="start_date"
                                value={start_date}
                                onChange={this.handleChange}
                                min={this.getTodayDate()}
                                style={{ borderColor: errorStartDate ? 'red' : '' }}
                            />
                            {errorStartDate && <p style={{ color: 'red' }}>{errorStartDate}</p>}

                            <label>Ngày kết thúc:</label>
                            <input
                                type="date"
                                name="end_date"
                                value={end_date}
                                onChange={this.handleChange}
                                ref={this.endDateRef}
                                min={this.getTodayDate()}
                                style={{ borderColor: errorEndDate ? 'red' : '' }}
                            />
                            {errorEndDate && <p style={{ color: 'red' }}>{errorEndDate}</p>}

                            <label>Tổng giá thuê:</label>
                            <input
                                type="text"
                                name="totalPrice"
                                value={totalPrice ? totalPrice.toLocaleString() : ''}
                                readOnly
                            />

                            <label>Tiền cọc (20%):</label>
                            <input
                                type="text"
                                name="deposit"
                                value={deposit ? deposit.toLocaleString() : ''}
                                readOnly
                            />

                        <div className="buttons">
                            <button
                                type="submit"
                                disabled={!userInfo || !!errorStartDate || !!errorEndDate}
                            >
                                Xác nhận
                            </button>
                            <button type="button" onClick={onClose}>Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    createNewRentalCar: (data) => dispatch(actions.createRentalCarStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormRentalCar);
