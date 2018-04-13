import React, {Component} from "react";
import {Form, Input, Button, DatePicker, message} from "antd";
import moment from "moment";
import {myAxios} from "utils";
const {RangePicker} = DatePicker;
const FormItem = Form.Item;

class QueryForm extends React.Component {
    state = {
        loading: false,
    };
    fetchOrderLog = (data) => {
        const reqParams = JSON.stringify(data);
        this.setState({
            loading: true,
        })
        myAxios.post('/saas/support/order/getOperationLog', reqParams).then((json) => {
            if (json.code === '000') {
                this.setState({
                    loading: false,
                })
                message.success(json.msg)
            } else {
                this.setState({
                    loading: false,
                })
                message.error(json.msg)
            }
        }).catch((err) => {
            this.setState({
                loading: false,
            })
            message.error('获取账单失败')
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {queryDate, ...other} = values;
                const queryParams = {
                    startDate: moment(values.queryDate[0]).format("YYYYMMDD"),
                    endDate  : moment(values.queryDate[1]).format("YYYYMMDD"),
                }
                this.fetchOrderLog(Object.assign(queryParams, other));
            }
        });
    }

    render() {
        const {loading} = this.state;
        const {getFieldDecorator} = this.props.form;


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
                        <Input style={{width: 240}} />
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
                        <Input style={{width: 240}} />
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
                        <Input style={{width: 240}} />
                    )}
                </FormItem>
                <FormItem
                    label="查询日期"
                >
                    {getFieldDecorator('queryDate', {
                        rules: [{
                            required: true, message: '请选择查询起始时间!',
                        }],
                    })(
                        <RangePicker />
                    )}
                </FormItem>
                <FormItem
                    label="关键字"
                >
                    {getFieldDecorator('keyWord', {
                        rules: [{
                            required: true, message: '请输入关键字!',
                        }],
                    })(
                        <Input style={{width: 240}} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={loading}>确定获取</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedQueryLogForm = Form.create()(QueryForm);

export default  WrappedQueryLogForm;
