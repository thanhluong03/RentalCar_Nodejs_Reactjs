import React, { Component} from "react";
import { connect } from "react-redux";
import './LocationList.scss'
import * as locationsactions from '../../../../store/actions/adminActions/locationActions';
class LocationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationsRedux: []
        }
    }

     componentDidMount() {
        this.props.fetchLocationRedux();
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listLocations !== this.props.listLocations){
            this.setState ({
                locationsRedux: this.props.listLocations
            })

        }
    }

    
    handleEditLocation = (location) => {
        this.props.handleButtonEditLocation(location)
    }

    handleDeleteLocation = (location) => {
        this.props.deleteLocation(location.id)
    }
    render() {
        let arrLocations = this.state.locationsRedux;
        console.log('fjgfkg', arrLocations)
        return (
            <React.Fragment>
            <table id = "LocationList">
                <tbody>
                <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Tên địa chỉ</th>
                    <th>Xử lý</th>
                </tr>
                {
                    arrLocations && arrLocations.length > 0 && arrLocations.map((item, index) => {
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
                                <td>{item.name_location}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => this.handleEditLocation(item)}><i className="fas fa-solid fa-pencil-alt"></i></button>
                                    <button className="btn-delete" onClick={() => this.handleDeleteLocation(item)}><i class="fas fa-trash"></i></button>
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
        listLocations: state.admin.locations
    };
};

const mapDispatchToProps = dispatch => {
    return {
       fetchLocationRedux: () => dispatch(locationsactions.fetchAllLocationsStart()),
       deleteLocation: (id) => dispatch(locationsactions.deleteLocation(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
