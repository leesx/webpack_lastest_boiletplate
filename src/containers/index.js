import React from "react";
import {Router} from "react-router";
import {Provider} from "react-redux";
import routes from "routes";
import {LocaleProvider} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";

export default class RootElement extends React.Component {
    render() {
        const {store, history} = this.props
        return (
            <LocaleProvider locale={zhCN}>
                <Router history={history} routes={routes}/>
            </LocaleProvider>
        )
    }
}
