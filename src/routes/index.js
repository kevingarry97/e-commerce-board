import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProtectedRoute from '../components/common/protectedRoute';
import routesName from '../utils/routesName';
import Overview from "../pages/overview";
import Product from '../pages/product';
import Orders from '../pages/order';
import Offerings from '../pages/offering';
import Notifications from '../pages/notification';
import Users from '../pages/users';
import AuthenticationPage from '../pages/authentication';

const Routes = () => {
    return (
        <Switch>
            <Route path={routesName.authentication} component={AuthenticationPage} />
            <ProtectedRoute path={routesName.product} component={Product} />
            <ProtectedRoute path={routesName.orders} component={Orders} />
            <ProtectedRoute path={routesName.offerings} component={Offerings} />
            <ProtectedRoute path={routesName.notifications} component={Notifications} />
            <ProtectedRoute path={routesName.users} component={Users} />
            <ProtectedRoute exact path={routesName.overview} component={Overview} />
        </Switch>
    )
}

export default Routes;