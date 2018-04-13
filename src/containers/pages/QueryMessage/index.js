import React, {Component} from "react";
import {Table, Button, message,Tooltip , Icon} from "antd";
import appConfig from "utils/appConfig";
import {myAxios, setRowKey} from "utils";
import WrappedSearchForm from "./WrappedSearchForm";
import SlidePanelWrap from "./SlidePanelWrap";
import SlideFormatPanel from "./SlideFormatPanel";

function setColumns(that) {
    const columns = [{
        title    : '记录ID',
        dataIndex: 'itemID',
        key      : 'itemID',
    }, {
        title    : '所属集团ID',
        dataIndex: 'groupID',
        key      : 'groupID',
    }, {
        title    : '店铺ID',
        dataIndex: 'shopID',
        key      : 'shopID',
    }, {
        title    : '店铺名称',
        dataIndex: 'shopName',
        key      : 'shopName',
        render   : (text, record, index) => text ? text : '--',
    }, {
        title    : '订单号',
        dataIndex: 'orderKey',
        key      : 'orderKey',
        render   : (text) => text ? text : '--',
    }, {
        title    : '消息ID',
        dataIndex: 'msgID',
        key      : 'msgID',
    }, {
        title    : '消息名称',
        dataIndex: 'msgName',
        key      : 'msgName',
    }, {
        title    : '消息类型',
        dataIndex: 'msgType',
        key      : 'msgType',
    }, {
        title    : 'action',
        dataIndex: 'action',
        key      : '记录状态',
    }, {
        title    : '返回消息',
        dataIndex: 'responseData',
        key      : 'responseData',
        width    : 200,
        render   : (text,record) => {
            return (
                <React.Fragment>
                    <textarea readOnly defaultValue={`${text}`}/>
                    <Tooltip placement="right" title="点击查看">
                        <Icon
                            className="show-code-icon"
                            type="code"
                            onClick={()=>that.handleShowJsonFormat(record)}
                        />
                    </Tooltip>

                </React.Fragment>
            )
        },
    }, {
        title    : '修改时间',
        dataIndex: 'actionTime',
        key      : 'actionTime',
    }, {
        title    : '创建时间',
        dataIndex: 'createTime',
        key      : 'createTime',
    }, {
        title    : '操作',
        dataIndex: 'other',
        key      : 'other',
        render   : (text, record, index) => {
            return record.msgType == '5002' ?
                <Button size="small" type="primary"
                        onClick={()=>that.handleOpen(record, index)}>修改</Button> : null;
        }
    }
    ];
    return columns;
}

export default class QueryMessage extends Component {
    state = {
        isShowModal      : false,
        loading          : false,
        isEdit           : false,
        currentPageNumber: 1,
        dataSource       : [],
        filterConditions : {},
    }

    componentDidMount() {
        this.getOrderList()
    }

    getOrderList = (data = {}) => {
        const {filterConditions} = this.state;
        const reqParams = JSON.stringify(Object.assign({},data, filterConditions));
        this.setState({loading: true})
        myAxios.post(`/saas/support/msg/all`, reqParams).then((json) => {
            if (json.code === '000') {
                this.setState({
                    loading   : false,
                    dataSource: setRowKey(json.data.msgRecordList),
                })
            } else {
                this.setState({loading: false})
            }
        }).catch((err) => {
            this.setState({loading: false})
            message.error('获取账单失败')
        })
    }
    updateOrderList = (data = {}) => {
        const reqParams = JSON.stringify(Object.assign(data));
        this.setState({submitLoading: true});
        myAxios.post(`/saas/support/order/update`, reqParams).then((json) => {
            if (json.code === '000') {
                message.success(json.msg);
                this.getOrderList();
            } else {
                message.error(json.msg)
            }
        }).catch((err) => {
            message.error('操作失败')
        }).finally(() => {
            this.setState({
                submitLoading: false,
            })
        })
    }

    saveFormRef = (form) => {
        this.form = form;
    }
    getFormValues = (values) => {
        this.setState({
            filterConditions: values,
        }, () => {
            this.getOrderList()
        })
    }
    handlePaginationChange = (page) => {
        this.setState({
            currentPageNumber: page
        })
    }

    handleOpen = (records) => {
        this.setState({
            isShow         : true,
            curEditJsonData: records.responseData || '',
        }, () => {
            this.form.setFieldsValue({
                shopID  : records.shopID,
                groupID : records.groupID,
                shopName: records.shopName,
                msgData : records.responseData || '',
            })
        })

    }
    handleClose = () => {
        this.setState({
            isShow: false
        })
    }

    handleOk = (e) => {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                try {
                    JSON.parse(values.msgData);
                    this.updateOrderList(values);
                } catch (e) {
                    message.error('插入的JSON格式不正确,请检查');
                }

            }
        });
    }
    handleShowJsonFormat=(record)=>{
        this.setState({
            isShowSlideFormat:true,
            curShowJsonData:record.responseData || '',
        })
    }

    handleSlideFormatClose=()=>{
        this.setState({
            isShowSlideFormat:false,
        })
    }
    render() {
        const {dataSource, loading, currentPageNumber, submitLoading} = this.state;
        const columns = setColumns(this);
        const pagination = Object.assign(appConfig.pagination, {
            current : currentPageNumber,
            onChange: this.handlePaginationChange
        });

        return (
            <div className="page-right-container">
                <div className="title">
                    <h2>查询账单</h2>
                </div>
                <div className="search-bar">
                    <WrappedSearchForm getFormValues={this.getFormValues}/>
                </div>
                <div>
                    <Table
                        loading={loading}
                        dataSource={dataSource}
                        bordered
                        columns={columns}
                        pagination={pagination}
                    />
                </div>

                <SlidePanelWrap
                    isEdit
                    ref={this.saveFormRef}
                    title="编辑"
                    submitLoading={submitLoading}
                    curEditJsonData={this.state.curEditJsonData}
                    isShow={this.state.isShow}
                    onClose={this.handleClose}
                    onOk={this.handleOk}
                />
                <SlideFormatPanel
                    title="查看"
                    isShow={this.state.isShowSlideFormat}
                    curShowJsonData={this.state.curShowJsonData}
                    onClose={this.handleSlideFormatClose}

                />
            </div>
        )
    }
}



