import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/layout/adminLayout';
import { getOrders } from '../services/orderService';

const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        (async () => {
            const {data} = await getOrders();

            setOrders(data);
        })()
    }, []);

    return (  
        <AdminLayout>
            <h5 className="py-md-3"><span className="text-success">+</span> List of Orders</h5>
            <div className="d-none d-md-block mt-3">
                <table class="table table-borderless">
                    <thead class="bg-white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Price</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <div className="my-3" />
                    <tbody>
                        {orders.map(order => (
                            <>
                                <tr className="bg-white">
                                    <th scope="row">
                                        <img src={order.cart.products[0].item.image[0]} width="40" alt="" />
                                    </th>
                                    <td>{order.cart.products[0].item.name}</td>
                                    <td>{order.cart.products[0].qty}</td>
                                    <td><b className="text-info">Rwf {order.cart.products[0].price}</b></td>
                                    <td>
                                        <i className="fa fa-credit-card mx-2 text-danger" />
                                        <span className="text-primary font-weight-bold">{order.payment}</span>
                                    </td>
                                    <td><small className="text-success font-weight-bold">Available in Rwanda</small></td>
                                    <td><span className={`badge ${order.status === 'Placed' ? 'badge-primary' : order.status === 'Accepted' ? 'badge-info' : order.status === 'Processed' ? 'badge-warning' :order.status === 'Completed' ? 'badge-success' : 'badge-danger'}`}>{order.status}</span></td>
                                    <td>{order.date}</td>
                                    <td>
                                    <div class="dropdown">
                                        <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-ellipsis-v" />
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            {(order.status === 'Placed' || order.status === 'Cancelled' ) && <a class="dropdown-item text-primary" href="#">
                                                <i className="fa fa-handshake-o" /> &nbsp; Accept Order
                                            </a>}
                                            {(order.status === 'Placed' || order.status === 'Accepted' ) && <a class="dropdown-item text-warning" href="#">
                                            <i className="fa fa-clock-o" /> &nbsp; Process Order
                                            </a>}
                                            {(order.status === 'Placed' || order.status === 'Accepted' || order.status === 'Processed') && <a class="dropdown-item text-success" href="#">
                                                <i className="fa fa-check-circle" /> &nbsp; Complete Order
                                            </a>}
                                            {order.status !== 'Completed' && <a class="dropdown-item text-danger" href="#">
                                                <i className="fa fa-times-circle" /> &nbsp; Cancel Order
                                            </a>}
                                        </div>
                                        </div>
                                    </td>
                                </tr>
                                <div className="my-2" />
                            </>
                        ))}
                    </tbody>
                </table>
            </div>    
        </AdminLayout>
    );
}
 
export default Orders;