import React, {Component} from "react";
import {Tabs} from "antd";
import {myAxios} from "utils";
import WrappedGetOrderForm from "./WrappedGetOrderForm";
import WrappedQueryLogForm from "./WrappedQueryLogForm";
import WrappedUpdateForm from "./WrappedUpdateForm";
import WrappedOrderReUploadForm from "./WrappedOrderReUploadForm";
import WrappedOrderRedoForm from "./WrappedOrderRedoForm";
import TakeawayPlatformOrder from "./TakeawayPlatformOrder";
const TabPane = Tabs.TabPane;

export default class SendMessage extends Component {
    state = {
        activeKey: localStorage.getItem('activeKey') || '1',
    }

    componentDidMount(){
      console.log(this.props)
    }

    handleChangeTabPane = (key) => {
        this.setState({
            activeKey: key
        },()=>{
            localStorage.setItem('activeKey', key);
        })
    }

    componentWillUnmount(){
        localStorage.removeItem('activeKey')
    }

    render() {
        return (
            <div className="page-right-container">
                <Tabs type="card"  activeKey={this.state.activeKey} onChange={this.handleChangeTabPane}>
                    <TabPane tab="获取账单" key="1">
                        <div style={{width: '20%'}}>
                            <WrappedGetOrderForm  />
                        </div>
                    </TabPane>
                    <TabPane tab="修改账单" key="2">
                        <WrappedUpdateForm isEdit/>
                    </TabPane>
                    <TabPane tab="插入账单" key="3">
                        <WrappedUpdateForm />
                    </TabPane>
                    <TabPane tab="获取操作日志" key="4">
                        <WrappedQueryLogForm />
                    </TabPane>
                    <TabPane tab="发送账单重传消息" key="5">
                        <WrappedOrderReUploadForm />
                    </TabPane>
                    <TabPane tab="发送接单补单消息" key="6">
                        <WrappedOrderRedoForm />
                    </TabPane>
                    <TabPane tab="三方外卖账单获取" key="7">
                        <TakeawayPlatformOrder />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
