import React, {Component, PropTypes} from "react";
import {Layout, Icon} from "antd";
import {myAxios} from "utils";
import {fetchUserInfo} from "actions/user";
import {setPlatform} from "actions/setPlatform";
import AppHeader from "./AppHeader";
import UserInfo from "./UserInfo";
import LeftMenu from "./LeftMenu";
import {Router, Route, NavLink} from "react-router-dom";
import createHistory from "history/createHashHistory"; // 锚点模式的history
const {Header, Sider, Content} = Layout;

//@pureRender
export default class App extends Component {

    state = {}

    componentDidMount() {

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {

        return (
            <Router history={createHistory()}>
                <div className="app-layout">
                    <Layout >
                        <AppHeader/>

                        <Layout>
                            <Sider
                                width={168}
                                style={{background: '#2f4050'}}
                                trigger={null}
                                collapsible
                                collapsed={this.state.collapsed}
                            >
                                <div className="toggle-menu">
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                </div>
                                <UserInfo  />
                                <LeftMenu
                                    collapsed={this.state.collapsed}
                                />
                            </Sider>
                            <Layout>
                                <h4>
                                    {
                                        <Route
                                            path={location.pathname}
                                            component={() => <div>888888888888888</div>}
                                        />
                                    }
                                </h4>
                                <Content style={{background: '#fff', margin: 0}}>
                                    <div className="page-main">{this.props.children}</div>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </div>

            </Router>
        );
    }
}
