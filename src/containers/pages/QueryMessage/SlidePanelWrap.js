/**
 * Created by leesx on 2018/3/9.
 */
import React, {Component} from "react";
import {Input, Button, Form} from "antd";
import JsonFormatBox from "components/JsonFormatBox";
import SlidePanel from "components/SlidePanel";
const FormItem = Form.Item;

class UpdateForm extends Component {

    handleChangeJsonArea = (value) => {
        this.props.form.setFieldsValue({
            msgData: value,
        })
    }


    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;

        return (
            <SlidePanel title={this.props.title} isShow={this.props.isShow} onClose={this.props.onClose}>
                <Form layout="inline" onSubmit={this.props.onOk}>
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
                    <FormItem label="需要插入的账单的JSON" className="format-item-row">
                        {getFieldDecorator('msgData', {
                            rules: [{
                                required: true, message: '需要插入的账单的JSON!',
                            }],
                        })(
                            <div>
                                <JsonFormatBox showType="all" onChange={this.handleChangeJsonArea} jsonData={this.props.curEditJsonData || '{}'} />
                            </div>
                        )}
                    </FormItem>

                    <FormItem
                        wrapperCol={{span: 12}}
                    >
                        <Button type="primary" htmlType="submit" loading={this.props.submitLoading}>确定修改</Button>
                    </FormItem>

                </Form>
            </SlidePanel>
        )
    }
}

const SlidePanelWrap = Form.create()(UpdateForm);
export default SlidePanelWrap;