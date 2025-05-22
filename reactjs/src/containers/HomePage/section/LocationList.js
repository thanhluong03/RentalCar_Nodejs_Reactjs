import React, { Component } from 'react';
import { connect } from 'react-redux';  

import Slider from "react-slick";
import './LocationList.scss';
import * as locationactions from '../../../store/actions/adminActions/locationActions';
import { withRouter } from 'react-router';
class LocationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLocations: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllLocationRedux();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.listlocations !== this.props.listlocations) {
            this.setState({
                dataLocations: this.props.listlocations
            });
        }
    }

    handleViewDetailLocation = (location) => {
        if (this.props.history) {
            this.props.history.push(`/detail-location/${location.id}`);
        }
    };
    render() {
        let {dataLocations} = this.state;
        console.log('check location: ', this.state)
        return (
            <div className="section-share section-location">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-location">Cơ sở nổi bật</span>

                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataLocations && dataLocations.length > 0 && 
                            dataLocations.map((item, index) => {
                                let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                return (
                                    <div className="section-customize location-child"
                                    key={index} onClick={() => this.handleViewDetailLocation(item)}
                                    >
                                        <div className="bg-image section-location"
                                        style={{backgroundImage: `url(${imageBase64})`}}></div>
                                        <div className="location-name">{item.name_location}</div>
                                    </div>
                                )
                            })
                        }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        listlocations: state.admin.locations,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllLocationRedux: () => dispatch(locationactions.fetchAllLocationsStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationList));
