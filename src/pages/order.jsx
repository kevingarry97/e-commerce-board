import React from 'react';
import AdminLayout from '../components/layout/adminLayout';

const Orders = () => {
    return (  
        <AdminLayout>
            <h5 className="py-md-3"><span className="text-success">+</span> List of Orders</h5>
            <div className="d-none d-md-block mt-3">
                <table class="table table-borderless">
                    <thead class="bg-white">
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
                    <div className="my-3" />
                    <tbody>
                        <tr className="bg-white">
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <div className="my-2" />
                        <tr className="bg-white">
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <div className="my-2" />
                        <tr className="bg-white">
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <div className="my-2" />
                    </tbody>
                </table>
            </div>    
        </AdminLayout>
    );
}
 
export default Orders;