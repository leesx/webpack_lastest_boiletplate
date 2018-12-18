/*
 * @Author: leesx
 * @Date: 2017-07-06 11:02:50
 * @Last Modified by:   leesx
 * @Last Modified time: 2017-07-06 11:02:50
 */
import React, {Component} from "react";
import {Menu, Dropdown, Icon} from "antd";
import {cookie,myAxios} from "utils";


function loginOut() {
    myAxios.get('/shop/opt/logoff').then(data=>{
        if(data.code === '000'){
            window.location.href = data.data;
        }
    }).catch(err=>{})

}
const menu = (
    <Menu>
        <Menu.Item>
            <a onClick={loginOut}><Icon type="poweroff" />退出</a>
        </Menu.Item>
    </Menu>
);

function UserInfo(props) {
    const {userName, brandLogoImg} = props
    return (
        <div className="user-info">
            <div className="user-photo">
                {brandLogoImg ? <img src={`http://res.leesx.com/${brandLogoImg}`}/> : <Icon type="user"/>}
            </div>
            {/*<Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
                    <span className="user-name">
                            {userName}
                    </span>
                    <Icon type="down"/>
                </a>
            </Dropdown>*/}
        </div>
    )
}
export default UserInfo;
