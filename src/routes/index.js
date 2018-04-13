import React, {Component} from "react";
import {Router, Route, IndexRedirect,browserHistory} from "react-router";

import App from "containers/pages/common/App";
import HomePage from "containers/pages/common/HomePage";
import NoMatch from "containers/pages/common/NoMatch";
//支撑工具
import SendMessage from "containers/pages/SendMessage";
import QueryMessage from "containers/pages/QueryMessage";




export default(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="home"/>
            <Route path="/home" component={HomePage}/>
            <Route path="/supporttools">
                <Route path="send_msg" component={SendMessage} />
                <Route path="query_msg" component={QueryMessage} />
            </Route>

            <Route path="*" component={NoMatch}></Route>
        </Route>
    </Router>
)