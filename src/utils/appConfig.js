/**
 * Created by leesx on 2017/7/31.
 */


//======================================================
// dohko 环境 "http://dev.xxxx.com"
// 线上环境 "http://xxxxx.com"
//======================================================
const
    {protocol, host, href} = window.location,
    __ENV__ = process.env.NODE_ENV === 'production',// 是否为生产环境
    //baseURL = process.env.SERVER_ENV === 'dev' ? 'http://xxxx.com' : 'http://xxxx.com',
    baseURL = '/',
    redirectURL = process.env.LOGIN_RE_URL === 'dohko'
        ? 'http://xxx.com'
        : 'http://xxx.com';

const pagination = {
    showSizeChanger: true,
    defaultCurrent : 1,
    showTotal      : (total) => {
        return `共${total}条数据`;
    },
    pageSizeOptions: ['10', '20', '40', '100'],
};
const appConfig = {
    baseURL,
    redirectURL,
    pagination,
    //accessToken: __ENV__ ? accessToken : mockAccessTokenToken,
    __ENV__,
}

export default appConfig
