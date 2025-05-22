import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailCar.scss';
import { getDetailCar } from '../../../../services/userService';
import HomeHeader from '../../../HomePage/HomeHeader';
import HomeFooter from '../../../HomePage/HomeFooter';

class DetailCar extends Component {
    constructor(props){
        super(props);
        this.state = {
            detailCar: {},
            currentCarId: null
        };
    }

    async componentDidMount(){
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({ currentCarId: id });

            let res = await getDetailCar(id);
            if(res && res.errCode === 0) {
                this.setState({ detailCar: res.data });
            }
        }
    }

    render() {
        let { detailCar } = this.state;
        console.log('check', this.state)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="car-detail-container">
                    <div className='title-detail'>Thông tin chi tiết xe</div>
                    <div className="intro-car">
                        <div className='right-detail'>
                            <div className="image-preview"
                                style={{ backgroundImage: `url(${detailCar?.image || ''})` }}>
                            </div>
                        </div>
                        <div className='left-detail'>
                            <div className="info-preview">
                                <h2>{detailCar?.name_car || 'Tên xe'}</h2>
                                <p><strong>Biển số:</strong> {detailCar?.license_plate}</p>
                                <p><strong>Loại xe:</strong> {detailCar?.typeData?.valueVi}</p>
                                <p><strong>Thương hiệu:</strong> {detailCar?.brand}</p>
                                <p><strong>Năm sản xuất:</strong> {detailCar?.model_year}</p>
                                <p><strong>Địa chỉ:</strong> {detailCar?.Location?.name_location}</p>
                                <p><strong>Giá thuê/ngày:</strong> {detailCar?.price_of_day} VND</p>
                                <p><strong>Trạng thái:</strong> {detailCar?.statusData?.valueVi}</p>
                            </div>
                            <div className='btn-detail'>
                                <button className='btn-rental-detail'>Thuê xe</button>
                            </div>
                        </div>
                    </div>
                </div>

                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCar);
