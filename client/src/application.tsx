import React from 'react';
import { Route, RouteChildrenProps, Switch } from 'react-router';
import routes from './config/routes';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    // define a switch
    return (
        <Switch>
            // callback function with route, index as props
            {routes.map((route, index) => {
                return (
                    // defining routes dynamically
                    <Route key={index} exact={route.exact} path={route.path} render={(routeProps: RouteChildrenProps<any>) => <route.component {...routeProps} />} />
                );
            })}
        </Switch>
    );
};

export default Application;
