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
                        <Input placehodler="请输入店铺ID"/>
                    )}
                </FormItem>
                <FormItem label='集团ID'>
                    {getFieldDecorator('groupID',)(
                        <Input placehodler="请输入集团ID" />
                    )}
                </FormItem>
                <FormItem label='云端账单号'>
                    {getFieldDecorator('orderKey',)(
                        <Input placehodler="请输入云端账单号"/>
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
