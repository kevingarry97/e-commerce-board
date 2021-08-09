import React from 'react';
import Form from '../components/common/form';
import Joi from 'joi-browser';
import AdminLayout from '../components/layout/adminLayout';
import { getNotification, sendNotification } from '../services/notificationService';

class Notifications extends Form {
    state = {
        notifications: [], 
        data: {
            title: '',
            message: '',
            assignee: ''
        },
        errors: {}
    };

    schema = {
        title: Joi.string().required().label('Title'),
        message: Joi.string().required().label('Message'),
        assignee: Joi.label('Assignee')
    }

    populateNotification = async () => {
        const {data: notifications} = await getNotification();
        this.setState({notifications})
    }

    async componentDidMount() {
        await this.populateNotification();
    }

    doSubmit = async () => {
        const {title, message, assignee} = this.state.data
        const obj = {
            title,
            message,
            assignee: assignee.startsWith('0') ? '25' + assignee : assignee.startsWith('250') ? assignee : '250' + assignee
        }
        const {data} = await sendNotification(obj);
        window.location.reload();
    }

    render() {
        const { notifications } = this.state;

        return (  
            <AdminLayout>
                <h5 className="py-md-3"><span className="text-success">+</span> Create Notifications</h5>
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-4">
                                    {this.renderInput('title', 'Title', '')}
                                </div>
                                <div className="col-md-3">
                                    {this.renderInput('assignee', 'Assignee', '')}
                                </div>
                                <div className="col-md-5">
                                    {this.renderInput('message', 'Message', '')}
                                </div>
                            </div>
                            <button disabled={this.validate()} className="btn btn-info rounded-pill float-right mt-4">+ Create Message</button>
                        </form>
                    </div>
                </div>
                <h5 className="pt-md-5 pb-3"><span className="text-success">+</span> List of Notifications</h5>
                <div className="d-none d-md-block mt-3">
                    <table class="table table-borderless">
                        <thead class="bg-white">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Assignee</th>
                                <th scope="col">Message</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification, key) => (
                                <tr key={key} className="bg-white">
                                    <th scope="row">{notification._id.slice(0, 7) + '...'}</th>
                                    <td>{notification.title}</td>
                                    <td>{notification.assignee}</td>
                                    <td>{notification.message}</td>
                                    <td><span class={`badge ${notification.status == 'Read' ? 'badge-primary' : 'badge-danger'} `}>{notification.status}</span></td>
                                    <td>{notification.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
        );
    }
}
 
export default Notifications;