/*
 * @Author: leesx
 * @Date: 2017-07-06 15:47:25
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-07 15:27:22
 */
import React, {Component} from "react";
import menuConfig from "utils/menuConfig";
import {Link} from 'react-router-dom';
import {Menu, Icon} from "antd";
const {SubMenu} = Menu;

function createMenuTree(cfg) {
    return cfg.map((item, index) => {
        if (item.children) {
            const titleFrag = (
                <React.Fragment>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </React.Fragment>
            );
            return (
                <SubMenu key={item.key} title={titleFrag}>
                    { createMenuTree(item.children) }
                </SubMenu>
            )
        }
        return (
            <Menu.Item key={`${item.key}`}>
                {
                    item.icon ? <Icon type={item.icon}/> : null
                }
                <Link to={item.link} exact="true" >
                    <span>{item.title}</span>
                </Link>
            </Menu.Item>
        )

    })
}


export default function LeftMenu(props) {
    return (
        <Menu
            theme="dark"
            mode="inline"
            onClick={props.handleClick}
            defaultSelectedKeys={['home']}
            selectedKeys={props.selectedKeys}
            defaultOpenKeys={props.openKeys}
            style={{height: '100%', borderRight: 0}}
        >
            {createMenuTree(menuConfig)}
        </Menu>
    )
}
