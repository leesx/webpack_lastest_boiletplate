import React,{Component} from "react";
import ReactDOM from "react-dom";

// //项目中自己的样式文件的样式
import 'assets/less/index.less';

import Loadable from "react-loadable"; // 用于代码分割时动态加载模块
import { Router, Route, Switch ,Redirect,Link } from "react-router-dom";

import App from "containers/pages/common/App";



const Home = Loadable({
  loader: () => import("containers/pages/common/HomePage"),
  loading: ()=><div>加载中.......</div>, // 自定义的Loading动画组件
  timeout: 10000
});

const SendMessage = Loadable({
  loader: () => import("containers/pages/SendMessage"),
  loading: ()=><div>加载中.......</div>,
  timeout: 10000
});

const QueryMessage = Loadable({
  loader: () => import("containers/pages/QueryMessage"),
  loading: ()=><div>加载中.......</div>,
  timeout: 10000
});

class Root extends Component{
    onEnter=(Component,props)=>{
        console.log('--->',props)
        return <Component {...props}/>
    }
    render(){
        return (
            <App>
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path="/home"  render={props => this.onEnter(Home, props)}/>
                    <Route path="/send_msg"  render={props => this.onEnter(SendMessage, props)}  />
                    <Route path="/query_msg" render={props => this.onEnter(QueryMessage, props)}  />
                </Switch>
            </App>
        )
    }
}

ReactDOM.render(<Root />,
    document.getElementById('root')
)
