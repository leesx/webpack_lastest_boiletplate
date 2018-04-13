import React, {Component} from "react";
import {Table, Button, message, Tooltip, Icon} from "antd";
import appConfig from "utils/appConfig";
import {myAxios, setRowKey} from "utils";
import moment from "moment";
import WrappedSearchForm from "./WrappedSearchForm";
import SlidePanelWrap from "./SlidePanelWrap";
import SlideFormatPanel from "./SlideFormatPanel";

function setColumns(that) {
    const columns = [{
        title    : '返回消息',
        dataIndex: 'msgData',
        key      : 'msgData',
        render   : (text, record) => {
            const msgJSONString = typeof record === 'object' ? JSON.stringify(record) : '{}';
            return (
                <React.Fragment>
                    <textarea style={{width: '80%'}} readOnly defaultValue={`${msgJSONString}`}/>
                    <Tooltip placement="right" title="点击查看">
                        <Icon
                            className="show-code-icon"
                            type="code"
                            onClick={() => that.handleShowJsonFormat(msgJSONString)}
                        />
                    </Tooltip>

                </React.Fragment>
            )
        },
    }, {
        title    : '操作',
        dataIndex: 'other',
        key      : 'other',
        width    : 200,
        render   : (text, record, index) => {
            const msgJSONString = typeof record === 'object' ? JSON.stringify(record) : '{}';
            return (
                <Button
                    size="small"
                    type="primary"
                    onClick={() => that.handleOpen(msgJSONString, index)}
                >
                    下发
                </Button>
            )
        }
    }
    ];
    return columns;
}

export default class TakeawayPlatformOrder extends Component {
    state = {
        isShowModal      : false,
        loading          : false,
        submitLoading:false,
        isEdit           : false,
        currentPageNumber: 1,
        dataSource       : [],
        filterConditions : {},
    }

    componentDidMount() {
        //this.getOrderList()
    }

    getOrderList = (data = {}) => {
        const {filterConditions} = this.state;
        const reqParams = JSON.stringify(Object.assign({}, data, filterConditions));
        this.setState({loading: true})
        myAxios.post('/saas/support/getPosMsg', reqParams).then((json) => {
            if (json.code === '000') {
                this.setState({
                    loading   : false,
                    dataSource: setRowKey(json.data),
                })
            } else {
                this.setState({loading: false})
            }
        }).catch((err) => {
            this.setState({loading: false})
            message.error('服务器错误')
        })
    }

    sendOrderRequest = (data = {}) => {
        const reqParams = JSON.stringify(data);
        this.setState({
            submitLoading: true,
        })
        myAxios.post('/saas/support/order/thirdPartyOrderRedo', reqParams).then((json) => {
            if (json.code === '000') {
                message.success(json.msg);
            } else {
                message.error(json.msg)
            }
        }).catch((err) => {
            message.error('服务器错误')
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

    handleOpen = (msgJSONString) => {
        this.setState({
            isShow         : true,
            curEditJsonData: msgJSONString,
        }, () => {
            this.form.setFieldsValue({
                shouldPrint: false,
                msg        : msgJSONString,
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
                    JSON.parse(values.msg);
                    values.reportDate = values.reportDate ? moment(values.reportDate).format('YYYYMMDD') : null;
                    this.sendOrderRequest(values);
                } catch (e) {
                    message.error('插入的JSON格式不正确,请检查');
                }

            }
        });
    }
    handleShowJsonFormat = (msgJSONString) => {
        this.setState({
            isShowSlideFormat: true,
            curShowJsonData  : msgJSONString,
        })
    }

    handleSlideFormatClose = () => {
        this.setState({
            isShowSlideFormat: false,
        })
    }

    render() {
        const {dataSource, loading, submitLoading, currentPageNumber} = this.state;
        const columns = setColumns(this);
        const pagination = Object.assign(appConfig.pagination, {
            current : currentPageNumber,
            onChange: this.handlePaginationChange
        });

        return (
            <div className="page-right-container">
                <div className="search-bar">
                    <WrappedSearchForm getFormValues={this.getFormValues}/>
                </div>
                <div>
                    <Table
                        loading={loading}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        //pagination={pagination}
                    />
                </div>

                <SlidePanelWrap
                    isEdit
                    ref={this.saveFormRef}
                    title="下发"
                    submitLoading={submitLoading}
                    curEditJsonData={this.state.curEditJsonData}
                    isShow={this.state.isShow}
                    onClose={this.handleClose}
                    onOk={this.handleOk}
                />
                <SlideFormatPanel
                    title="返回消息体"
                    isShow={this.state.isShowSlideFormat}
                    curShowJsonData={this.state.curShowJsonData}
                    onClose={this.handleSlideFormatClose}
                />
            </div>
        )
    }
}



