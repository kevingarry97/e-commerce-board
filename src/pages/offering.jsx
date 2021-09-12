/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/layout/adminLayout';
import { getRequest, updateRequest } from '../services/requestService';

const Offerings = () => {
    const [comment, setComment] = useState('');
    const [item, setItem] = useState('');
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        (async () => {
            const {data: requests} = await getRequest();
            setRequests(requests);
        })();
    }, []);

    const handleChange = ({target}) => {
        setComment(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateRequest({...item, comment});
        if(result.status !== 200) return alert('Error while updating')

        window.location.reload();
    }

    return (  
        <AdminLayout>
            <h5 className="py-md-3"><span className="text-success">+</span> List of Offerings</h5>
            <div className="d-none d-md-block mt-3">
                <table class="table table-borderless">
                    <thead class="bg-white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product name</th>
                            <th scope="col">Est. Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">User name</th>
                            <th scope="col">User phone</th>
                            <th scope="col">Created At</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, key) => (
                            <tr className="bg-white">
                                <th scope="row">
                                    <img src={request.image[0]} width="80" className="shadow-sm p-2" alt="" />
                                </th>
                                <td><span className="text-muted">{request.name}</span></td>
                                <td><span className="text-muted">{request.price}</span></td>
                                <td><span className={`badge ${request.status === 'Not Read' ? 'badge-danger' : 'badge-primary'} badge-primary`}>{request.status}</span></td>
                                <td><span className="text-muted">{request.user.name}</span></td>
                                <td><span className="text-muted">{request.user.phone}</span></td>
                                <td><span className="text-muted">{request.dateCreated.slice(0, 12) + '...'}</span></td>
                                <td>
                                    {request.status === 'Not Read' ? <button className="btn" type="button" data-toggle="modal" data-target="#requestModal" onClick={() => setItem(request)}>
                                        <i className="fa fa-envelope text-primary" />
                                    </button> : <i className="fa fa-envelope-o text-success" />}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="requestModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0">
                        <div className="modal-header pb-0">
                            <h5 className="mb-4"><span className="text-success">+</span> &nbsp;Create Note</h5>
                        </div>
                        <div className="modal-body mt-2">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Note:</label>
                                    <textarea value={comment} onChange={handleChange} className="form-control" placeholder="Give note" name="note" rows="3" />
                                </div>
                                <button className="btn btn-info btn-sm float-right mt-3 rounded-pill">Send Note</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
 
export default Offerings;