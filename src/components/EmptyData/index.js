/**
 * Created by leesx on 7/25/17.
 * 扩展Ant无数据提示
 * 接受参数 text {string}
 */
import React from "react";
import classNames from "classnames";
import "./index.less";

export default function EmptyData(props) {

    const className = classNames(
        'empty-data',
        props.className
    );

    return (
        <div className={className}>
            <div className="empty-data-placeholder">
                <span>
                    <i className="anticon anticon-frown-o"></i><span>{ props.text ? props.text : '暂无数据'  }</span>
                    </span>
            </div>
        </div>
    );
};
