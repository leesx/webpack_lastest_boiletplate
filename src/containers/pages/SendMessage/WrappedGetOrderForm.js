/**
 * Created by leesx on 2018/3/23.
 */
import React, {Component} from "react";
import {Form, Input, Button, message} from "antd";
import {myAxios} from "utils";
const FormItem = Form.Item;
const { TextArea } = Input;

class QueryForm extends React.Component {
    state = {
        loading:false,
    };
    fetchOrder=(data)=>{
        const reqParams = JSON.stringify(data);
        this.setState({
            loading:true,
        })
        myAxios.post(`/saas/support/order/get`, reqParams).then((json) => {
            if (json.code === '000') {
                this.setState({
                    loading:false,
                })
                message.success('获取账单成功')
            } else {
                this.setState({
                    loading:false,
                })
                message.error('获取账单失败')
            }
        }).catch((err) => {
            this.setState({
                loading:false,
            })
            message.error('获取账单失败')
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.fetchOrder(values);
            }
        });
    }

    render() {
        const {loading} = this.state;
        const { getFieldDecorator } = this.props.form;


        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="店铺ID"
                >
                    {getFieldDecorator('shopID', {
                        rules: [{
                            required: true, message: '请输入店铺ID!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="集团ID"
                >
                    {getFieldDecorator('groupID', {
                        rules: [{
                            required: true, message: '请输入集团ID!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="店铺名称"
                >
                    {getFieldDecorator('shopName', {
                        rules: [{
                            required: true, message: '请输入店铺名称!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="云端订单号"
                >
                    {getFieldDecorator('channelOrderkey')(
                        <TextArea placeholder="请输入云端订单号,如果存在多个，用逗号分隔" autosize={{ minRows: 4, maxRows: 6 }} />
                    )}
                </FormItem>
                <FormItem
                    label="SAAS订单号"
                >
                    {getFieldDecorator('saasOrderKey')(
                        <TextArea placeholder="请输入SAAS订单号,如果存在多个，用逗号分隔"  autosize={{ minRows: 4, maxRows: 6 }} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={loading}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedGetOrderForm = Form.create()(QueryForm);
export default  WrappedGetOrderForm;