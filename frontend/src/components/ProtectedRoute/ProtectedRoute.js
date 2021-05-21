import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from 'axios';
import cookie from 'react-cookies'

const ProtectedRoute = ({ component: Component, ...rest}) => {
    const [authStatus, setAuthStatus] = useState(undefined); // undefined = no auth, cookie value = auth
    const checkAuthStatus = async () => {
        await Axios.get('/dashboard/getInfo')
        .then(res => {
            console.log(res);
            setAuthStatus(res.data.userInfo);
            console.log(authStatus)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    const pingCookie = () => {
        console.log(cookie.load('discord.oauth2'))
        setAuthStatus(cookie.load('discord.oauth2'))
    }

    return (
        <Route {...rest}
        render = {props => {
            //if (false) {
            //Check if user is authenticated
            if (authStatus) {
                return <Component {...rest} {...props} />
            } else {
                return <Redirect to = '/auth'/>
            }
        }} />
    )
}
export default ProtectedRoute;