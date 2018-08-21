import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import LoginPage from './pages/LoginPage'
import Page404 from './pages/Page404'

class PrivateRoute extends Component {
    render () {
        //console.log(this.props)
        if (localStorage.getItem('TOKEN')) {
            const ComponenteQueVaiNaTela = this.props.component
            //console.log(this.props.component)
            //return ( <ComponenteQueVaiNaTela /> )
            return ( <Route component={ComponenteQueVaiNaTela} />)
        } else {
            return ( <Redirect to="/login" /> )
        }
    }
}

const LogoutPage = () => {
    localStorage.removeItem('TOKEN')
    return ( <Redirect to="/login" /> )
}



export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LogoutPage} />
                <Route component={Page404} />
            </Switch>
        )
    }
}