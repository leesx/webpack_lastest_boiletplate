/*
 * @Author: leesx
 * @Date: 2017-07-06 11:02:34
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-06 15:01:20
 */
import React, {Component} from "react";
import {Link} from "react-router";
import {Layout,Icon} from "antd";
const {Header} = Layout;

export default class AppHeader extends Component {
    render() {
        return (
            <Header className="header clearfix">
                <div className="title">
                    <Icon type="code" />Saas2.0 统计&监控服务
                </div>

            </Header>
        )
    }
}
