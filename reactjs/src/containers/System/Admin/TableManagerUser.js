import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss';
import * as actions from "../../../store/actions"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// const mdParser = new MarkdownIt(/* Markdown-it options */);

// // Finish!
// function handleEditorChange({ html, text }) {
//   console.log('handleEditorChange', html, text);
// }


class TableManagerUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount(){
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUsers !== this.props.listUsers)
        {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        let arrUsers = this.state.usersRedux
        return (
             <React.Fragment>
                <table id="TableManagerUser">
                <tbody>
                <tr>
                        <th>Địa chỉ email</th>
                        <th>Tên</th>
                        <th>Họ </th>
                        <th>Địa chỉ </th>
                        <th>Xử lý</th>
                    </tr>
                        {
                            arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            
                                return (
                                    <tr key= {index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-solid fa-pencil-alt"></i></button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                </tbody>       
             </table>
             {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
             </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
