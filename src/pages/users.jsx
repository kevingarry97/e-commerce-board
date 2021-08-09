import React from 'react';
import Form from '../components/common/form';
import AdminLayout from '../components/layout/adminLayout';
import Joi from 'joi-browser';
import {register, getUsers} from '../services/userService';

class Users extends Form {
    state = {  
        data: {
            name: '',
            email: '',
            phone: '',
            password: '',
            role: ''
        },
        errors: {},
        users: []
    };

    schema = {
        name: Joi.string().required().label('Name'),
        email: Joi.string().required().email().label('Email'),
        phone: Joi.string().required().label('Phone'),
        password: Joi.string().required().label('Password'),
        role: Joi.label('Role'),
    }

    populateUser = async () => {
        const {data: users} = await getUsers();
        this.setState({users})
    }

    async componentDidMount() {
        await this.populateUser();
    }
    

    doSubmit = async () => {
        const {email, name, phone, password} = this.state.data;
        const user = {
            email,
            name,
            password,
            phone: phone.startsWith('0') ? '25' + phone : phone.startsWith('250') ? phone : '250' + phone,
            role: 'Assistant'
        }
        
        try {
            await register(user);

            window.location.reload();
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.phone = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() { 
        const { users } = this.state;
        return (  
            <AdminLayout>
                <div className="d-flex justify-content-between flex-wrap align-items-center my-3">
                    <h5><i className="fa fa-address-book-o" /> &nbsp;Users</h5>
                    <button className="btn btn-success rounded-pill" data-toggle="modal" data-target="#exampleModal">+ Create Assistant</button>
                </div>
                <div className="d-none d-md-block mt-5">
                    <table className="table table-borderless">
                        <thead className="bg-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User name</th>
                                <th scope="col">User Phone</th>
                                <th scope="col">User Email</th>
                                <th scope="col">User Role</th>
                                <th scope="col">Created At</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i} className="bg-white">
                                    <th scope="row">{user._id.slice(0, 9) + '...'}</th>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td><span class={`badge ${user.role == 'Admin' ? 'badge-success' : 'badge-primary'} `}>{user.role}</span></td>
                                    <td>{user.dateCreated}</td>
                                    <td>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0">
                            <div className="modal-header pb-0">
                                <h5 className="mb-4"><span className="text-success">+</span> &nbsp;Create Assistant</h5>
                            </div>
                            <div className="modal-body mt-2">
                                <form onSubmit={this.handleSubmit}>
                                    {this.renderInput('name', 'Name', 'form-group', 'User name')}
                                    {this.renderInput('email', 'Email', 'form-group', 'User email', 'email')}
                                    {this.renderInput('phone', 'Phone', 'form-group', 'User phone', 'number')}
                                    {this.renderInput('password', 'Password', 'form-group', 'User password', 'password')}
                                    <button className="btn btn-success btn-block mt-4" disabled={this.validate()}>+ &nbsp;Create Assistant</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}
 
export default Users;