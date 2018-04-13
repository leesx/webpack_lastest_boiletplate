/**
 * Created by leesx on 2018/3/9.
 */
import React, {Component} from "react";
import {Input, Button, Form, message} from "antd";
import JsonFormatBox from "components/JsonFormatBox";
import {myAxios} from "utils";
const FormItem = Form.Item;

class UpdateForm extends Component {

    state = {
        loading: false,
    }
    updateOrder = (data = {}) => {
        const {isEdit} = this.props;
        const reqParams = JSON.stringify(data);
        const opt = isEdit ? 'update' : 'insert';
        this.setState({loading: true});
        myAxios.post(`/saas/support/order/${opt}`, reqParams).then((json) => {
            if (json.code === '000') {
                message.success(json.msg)
            } else {
                message.error(json.msg)
            }
        }).catch((err) => {
            message.error('服务器错误')
        }).finally(() => {
            this.setState({loading: false});
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                try {
                    JSON.parse(values.msgData);
                    this.updateOrder(values);
                } catch (e) {
                    message.error('插入的JSON格式不正确,请检查');
                }
            }
        });
    }

    handleChangeJsonArea = (value) => {
        this.props.form.setFieldsValue({
            msgData: value,
        })
    }

    render() {
        const {loading} = this.state;
        const {form} = this.props;
        const {getFieldDecorator} = form;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem
                    label="店铺ID"
                >
                    {getFieldDecorator('shopID', {
                        rules: [{
                            required: true, message: '请输入店铺ID!',
                        }],
                    })(
                        <Input style={{width: 240}}/>
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
                        <Input style={{width: 240}}/>
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
                        <Input style={{width: 240}}/>
                    )}
                </FormItem>
                <FormItem
                    label="需要插入的账单的JSON"
                >
                    {getFieldDecorator('msgData', {
                        rules: [{
                            required: true, message: '需要插入的账单的JSON!',
                        }],
                    })(
                        <div>
                            <JsonFormatBox showType="all" onChange={this.handleChangeJsonArea}/>
                        </div>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{span: 12}}
                >
                    <Button type="primary" htmlType="submit" loading={loading}>确定修改</Button>
                </FormItem>

            </Form>
        )
    }
}

const WrappedUpdateForm = Form.create()(UpdateForm);
export default WrappedUpdateForm;