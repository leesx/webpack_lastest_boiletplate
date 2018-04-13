/**
 * Created by leesx on 2018/3/6.
 */
import React, {Component} from "react";
import {Input, Button, Select, Form} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;


class SearchForm extends React.Component {
    state = {
        curCityArea: [],
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.getFormValues(values);
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form
                layout="inline"
                onSubmit={this.handleSearch}
            >

                <FormItem label='店铺ID'>
                    {getFieldDecorator('shopID',)(
                        <Input/>
                    )}
                </FormItem>
                <FormItem label='集团ID'>
                    {getFieldDecorator('groupID',)(
                        <Input/>
                    )}
                </FormItem>
                <FormItem label='消息类型'>
                    {getFieldDecorator('msgType',)(
                        <Select style={{width: 120}}>
                            <Option value="">全部</Option>
                            <Option value="5001">获取日志</Option>
                            <Option value="5002">获取账单信息</Option>
                            <Option value="5003">更新账单信息</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" icon="search" htmlType="submit">查询</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedSearchForm = Form.create()(SearchForm);
export default WrappedSearchForm;
