import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from 'axios';

const ProtectedRoute = ({ component: Component, ...rest}) => {
    const [authStatus, setAuthStatus] = useState({});
    const checkAuthStatus = async () => {
        await Axios.get('/dashboard/getInfo')
        .then(res => {
            console.log(res);
            setAuthStatus(res.data.userInfo);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    //TO DO: Call checkAuthStatus and check if user is authenticated to determine whether or not to redirect.
    return (
        <Route {...rest}
        render = {props => {
            //if (false) {
            //Check if user is authenticated
            if (false) {
                return <Component {...rest} {...props} />
            } else {
                return <Redirect to = '/auth'/>
            }
        }} />
    )
}
export default ProtectedRoute;