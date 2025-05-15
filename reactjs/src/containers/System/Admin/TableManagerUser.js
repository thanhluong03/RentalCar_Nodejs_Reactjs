import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManagerUser.scss';
import * as actions from "../../../store/actions/adminActions/userActions"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

class TableManagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            genderArr: [],
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
        this.props.fetchGender();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({ usersRedux: this.props.listUsers });
        }
        if (prevProps.listGender !== this.props.listGender) {
            this.setState({ genderArr: this.props.listGender });
        }
    }

    handleDeleteUser = (user) => {
        let confirmDelete = window.confirm(`Bạn có chắc muốn xóa người dùng tên: "${user.last_name} ${user.first_name}" không?`)
        if(confirmDelete) {
            this.props.deleteUserRedux(user.id);
        }
    };

    render() {
        let { usersRedux } = this.state;
        return (
            <div className="table-wrapper">
                <div className="title">Danh sách thông tin khách hàng</div>
                <div className="scroll-container">
                    <table id="TableManagerUser">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Họ</th>
                                <th>Tên</th>
                                <th>Tuổi</th>
                                <th>Giới tính</th>
                                <th>Bằng lái xe</th>
                                <th>SDT</th>
                                <th>Email</th>
                                <th>Xử lý</th>
                            </tr>
                            {usersRedux && usersRedux.length > 0 &&
                                usersRedux.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.driver_licence) {
                                        imageBase64 = new Buffer(item.driver_licence, 'base64').toString('binary');
                                    }

                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.last_name}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.age}</td>
                                            <td>
                                                {this.state.genderArr.find(g => g.keyMap === item.gender)?.valueVi}
                                            </td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                                {imageBase64 ? (
                                                    <div className="img" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                ) : (
                                                    <div className="img no-image">No Image</div>
                                                )}
                                            </td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listUsers: state.admin.users,
    listGender: state.admin.genders,
});

const mapDispatchToProps = dispatch => ({
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    fetchGender: () => dispatch(actions.fetchGenderStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
