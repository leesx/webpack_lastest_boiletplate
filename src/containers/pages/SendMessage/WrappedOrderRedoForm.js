/**
 * Created by leesx on 2018/3/23.
 */
import React, {Component} from "react";
import {Form, Switch, Button,DatePicker, message} from "antd";
import {myAxios} from "utils";
import moment from "moment";
import JsonFormatBox from "components/JsonFormatBox";
const FormItem = Form.Item;

class QueryForm extends React.Component {
    state = {
        loading: false,
    };
    fetchOrder = (data={}) => {
        const reqParams = JSON.stringify(data);
        this.setState({
            loading: true,
        })
        myAxios.post('/saas/support/order/thirdPartyOrderRedo', reqParams).then((json) => {
            if(json.code ==='000'){
                message.success(json.msg);
            }else{
                message.error(json.msg)
            }
        }).catch((err) => {
            message.error('服务器错误')
        }).finally(()=>{
            this.setState({
                loading: false,
            })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                try {
                    JSON.parse(values.msg);
                    values.reportDate = values.reportDate ? moment(values.reportDate).format('YYYYMMDD') : null;
                    this.fetchOrder(values);
                } catch (e) {
                    message.error('插入的JSON格式不正确,请检查');
                }
            }
        });
    }

    handleChangeJsonArea = (value) => {
        this.props.form.setFieldsValue({
            msg: value,
        })
    }

    render() {
        const {loading} = this.state;
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="是否需要打印"
                >
                    {getFieldDecorator('shouldPrint', {valuePropName: 'checked',initialValue:false})(
                        <Switch checkedChildren="是" unCheckedChildren="否"/>
                    )}
                </FormItem>
                <FormItem
                    label="账单所在营业日"
                >
                    {getFieldDecorator('reportDate')(
                        <DatePicker style={{width: 240}}  />
                    )}
                </FormItem>
                <FormItem
                    label="需要插入的账单的JSON"
                >
                    {getFieldDecorator('msg', {
                        rules: [{
                            required: true, message: '需要插入的账单的JSON!',
                        }],
                    })(
                        <React.Fragment>
                            <JsonFormatBox showType="all" jsonData={this.props.curEditJsonData || '{}'} onChange={this.handleChangeJsonArea}/>
                        </React.Fragment>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={loading}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedOrderRedoForm = Form.create()(QueryForm);
export default  WrappedOrderRedoForm;