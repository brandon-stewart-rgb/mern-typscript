import React from 'react';
import { Route, RouteComponentProps, Routes } from 'react-router';
import routes from './config/routes';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    // define a Routes
    return (
        <Routes>
            // callback function with route, index as props
            {routes.map((route, index) => {
                return (
                    // defining routes dynamically
                    <Route key={index} exact={route.exact} path={route.path} render={(routeProps: RouteComponentProps<any>) => <route.component {...routeProps} />} />
                );
            })}
        </Routes>
    );
};

export default Application;
