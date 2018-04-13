/**
 * Created by leesx on 2018/3/9.
 */
import React, {Component} from "react";
import JsonFormatBox from "components/JsonFormatBox";
import SlidePanel from "components/SlidePanel";

export default function SlideFormatPanel(props) {
    return (
        <SlidePanel title={props.title} isShow={props.isShow} onClose={props.onClose}>
            <JsonFormatBox showType="right" jsonData={props.curShowJsonData || '{}'} />
        </SlidePanel>
    )
}

