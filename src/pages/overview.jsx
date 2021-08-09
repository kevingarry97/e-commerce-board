/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { AddAPhoto, Assignment, Dns, PersonAdd } from '@material-ui/icons';
import AdminLayout from '../components/layout/adminLayout';
import Card from '../assets/images/card.png';
import Form from '../components/common/form';
import Joi from 'joi-browser';
import {getUsers} from '../services/userService';
import {getBanner, sendBanner, updateBanner} from '../services/bannerService';
import {getProduct} from '../services/productService';
import {getRequest} from '../services/requestService';

class Overview extends Form {
    state = {
        users: [],
        banners: [],
        products: [],
        requests: [],
        data: {
            name: '',
            user: '',
            image: ''
        },
        errors: {}
    }

    schema = {
        name: Joi.string().required().label('Name'),
        user: Joi.string().required().label('User'),
        image: Joi.label('Image'),
    }

    onChange = ({target}) => {
        const data = {...this.state.data};
        data['image'] = target.files[0];

        this.setState({data});
    }

    populateUsers = async () => {
        const {data: users} = await getUsers();
        this.setState({users});
    }
    
    populateBanners = async () => {
        const {data: banners} = await getBanner();
        this.setState({banners});
    }
    
    populateProducts = async () => {
        const {data: products} = await getProduct();
        this.setState({products});
    }
    
    populateRequests = async () => {
        const {data: requests} = await getRequest();
        this.setState({requests});
    }

    async componentDidMount() {
        await this.populateUsers();
        await this.populateBanners();
        await this.populateProducts();
    }

    bannerUpdate = async (item) => {
        const {data} = await updateBanner(item._id, item);
        console.log(data);
        window.location.reload();
    }
    
    doSubmit = async () => {
        try {
            const {data} = await sendBanner(this.state.data);
            window.location.reload();
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.name = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        const {users, banners, products, requests} = this.state;
        return (
            <AdminLayout>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-md-7 border-right my-4">
                            <h2 className="font-weight-bold mb-0">Overview</h2>
                            <p><small className="text-muted">More information about the platform</small></p>
                            <div className="row my-4">
                                <div className="col-xl-3 col-md-12 col-6 my-2">
                                    <div className="card border-0 shadow-sm rounded-0">
                                        <div className="card-body pb-3">
                                            <div className="media">
                                                <div className="bg-light p-2 rounded">
                                                    <Dns />
                                                </div>
                                                <div className="media-body ml-2">
                                                    <p className="mb-1 text-info"><b>Orders</b></p>
                                                    <h6 className="mb-1"><b>3</b></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-12 col-6 my-2">
                                    <div className="card border-0 shadow-sm rounded-0">
                                        <div className="card-body pb-3">
                                            <div className="media">
                                                <div className="bg-light p-2 rounded">
                                                    <Assignment />
                                                </div>
                                                <div className="media-body ml-2">
                                                    <p className="mb-1 text-info"><b>Offerings</b></p>
                                                    <h6 className="mb-1"><b>{requests?.length}</b></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-12 col-6 my-2">
                                    <div className="card border-0 shadow-sm rounded-0">
                                        <div className="card-body pb-3">
                                            <div className="media">
                                                <div className="bg-light p-2 rounded">
                                                    <AddAPhoto />
                                                </div>
                                                <div className="media-body ml-2">
                                                    <p className="mb-1 text-info"><b>Products</b></p>
                                                    <h6 className="mb-1"><b>{products?.length}</b></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-12 col-6 my-2">
                                    <div className="card border-0 shadow-sm rounded-0">
                                        <div className="card-body pb-3">
                                            <div className="media">
                                                <div className="bg-light p-2 rounded">
                                                    <PersonAdd />
                                                </div>
                                                <div className="media-body ml-2">
                                                    <p className="mb-1 text-info"><b>Users</b></p>
                                                    <h6 className="mb-1"><b>{users?.length}</b></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center flex-wrap mt-5">
                                <h5 className="font-weight-bold text-muted">List of Stores</h5>
                                <button className="btn btn-info rounded-pill">
                                    <span>+ Create Store</span>
                                </button>
                            </div>
                            <div className="d-none d-md-block my-5">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Store name</th>
                                            <th scope="col">Owner name</th>
                                            <th scope="col">Owner email</th>
                                            <th scope="col">Owner phone</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-5 my-4">
                            <img src={Card} alt="" className="img-fluid" />
                            <div className="my-5">
                                <div className="d-flex justify-content-between flex-wrap align-items-center">
                                    <h6 className="font-weight-bold text-info">List of Banners</h6>
                                    <button className="btn btn-warning py-1 rounded-pill">
                                        <span className="text-white"  data-toggle="modal" data-target="#bannerModal">+ Banner</span>
                                    </button>
                                </div>
                                {banners.map((banner, i) => (
                                    <div key={i} className="card border-0 shadow-sm my-3">
                                        <div className="card-body py-2">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div className="media">
                                                    <img src={banner.image} className="img-fluid w-25" alt="" />
                                                    <div className="media-body ml-3 mt-2">
                                                        <h6 className="font-weight-bold text-primary">{banner.name}</h6>
                                                        <a class={`badge ${banner.status === 'Read' ? 'badge-success' : 'badge-danger'}`} onClick={() => this.bannerUpdate(banner)}>{banner.status}</a>
                                                    </div>
                                                </div>
                                                <p><small className="text-success font-weight-bold">+{banner.user.phone}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="bannerModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0">
                            <div className="modal-header pb-0">
                                <h5 className="mb-4"><span className="text-success">+</span> &nbsp;Create Assistant</h5>
                            </div>
                            <div className="modal-body mt-2">
                                <form onSubmit={this.handleSubmit}>
                                    {this.renderInput('name', 'Name', 'form-group', 'Product name')}
                                    {this.renderSelect('user', 'Users', users)}
                                    <div className="my-1">
                                        <div className="mt-1 custom-file">
                                            <label htmlFor="">Image:</label>
                                            <input type="file" className="form-control border-0 p-0 mb-2" onChange={this.onChange} />
                                        </div>
                                    </div>
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
 
export default Overview;