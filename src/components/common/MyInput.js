/**
 * Created by leesx on 2017/10/23.
 */
import React, {Component} from "react";
import {Input} from "antd";

var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]",'ig')
export default class MyInput extends Component{
    render(){
        return <Input />
    }
}