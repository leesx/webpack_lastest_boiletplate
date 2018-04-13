/**
 * Created by leesx on 2017/8/2.
 */
const menuConfig = [
    {
        title: '首页',
        icon : 'home',
        key  : 'home',
        link : '/home',
    }, {
        title   : '支撑工具',
        icon    : 'setting',
        key     : 'supporttools',
        children: [{
            title: '消息下发',
            key  : 'send_msg',
            link : '/send_msg',
        }, {
            title: '消息查询',
            key  : 'query_msg',
            link : '/query_msg',
        }]
    }]

export default menuConfig
