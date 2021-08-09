/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Form from '../components/common/form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import { register } from '../services/userService';
import routesName from '../utils/routesName';

class AuthenticationPage extends Form {
    state = {  
        data: {
            name: '',
            email: '',
            phone: '',
            password: '',
            role: ''
        },
        errors: {},
        showLogin: false,
    };

    schema = {
        name: Joi.label('Name'),
        email: Joi.label('Email'),
        phone: Joi.label('Phone'),
        password: Joi.required().label('password'),
        role: Joi.label('role'),
    }

    doSubmit = async () => {
        const {email, name, phone, password} = this.state.data;
        const user = {
            email,
            name,
            password,
            phone: phone.startsWith('0') ? '25' + phone : phone.startsWith('250') ? phone : '250' + phone,
            role: 'Admin'
        }
        if(this.state.showLogin) {
            try {
                await auth.login(user.phone, user.password);
                const { state } = this.props.location;

                window.location = state ? state.from.pathname : routesName.overview;
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    const errors = { ...this.state.errors };
                    errors.phone = ex.response.data;
                    this.setState({ errors });
                }
            }
        } else {
            try {
                const {headers} = await register(user);
                auth.loginWithJwt(headers['x-auth-token']);
                window.location = routesName.overview;
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    const errors = { ...this.state.errors };
                    errors.name = ex.response.data;
                    this.setState({ errors });
                }
            }
        }
    }

    render() {
        const {showLogin} = this.state;
        return (  
            <main className="bg-lights d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="text-center">{!showLogin ? 'Create an Account' : 'Welcome Back'}</h5>
                                    <p className="text-center"><small className="text-muted">{!showLogin ? 'You can create your own account and manage right now.' : 'Enter your credentials to access your account'}</small></p>
                                    <form className="m-4 pt-4" onSubmit={this.handleSubmit}>
                                        {!showLogin && this.renderInput('name', 'Name', 'form-group', 'Enter your name')}
                                        {!showLogin && this.renderInput('email', 'Email', 'form-group', 'Enter your email')}
                                        {this.renderInput('phone', 'Phone', 'form-group', 'Enter your phone', 'number')}
                                        {this.renderInput('password', 'Password', 'form-group', 'Enter your password', 'password')}
                                        {showLogin && this.renderButton(`Sign In`)}
                                        {!showLogin && this.renderButton(`Sign Up`)}
                                    </form>
                                </div>
                            </div>
                            <p className="text-center mt-3"><small className="text-muted">{!showLogin ? 'Already' : 'Don\'t'} have an account ? <a href="#" onClick={() => this.setState({showLogin: !showLogin})} className="text-primary">Sign {!showLogin ? 'In' : 'Up'}</a></small></p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
 
export default AuthenticationPage;