/**
 * Created by leesx on 2017/7/31.
 */


//======================================================
// dohko 环境 "http://dohko.api.transformer.hualala.com"
// 线上环境 "http://api.transformer.hualala.com"
//======================================================
const
    {protocol, host, href} = window.location,
    __ENV__ = process.env.NODE_ENV === 'production',// 是否为生产环境
    //baseURL = process.env.SERVER_ENV === 'dohko' ? 'http://dohko.api.transformer.hualala.com' : 'http://api.transformer.hualala.com',
    baseURL = '/',
    redirectURL = process.env.LOGIN_RE_URL === 'dohko'
        ? 'http://dohko.login.hualala.com:31251/login?redirectURL=http://dohko.api.transformer.hualala.com'
        : 'http://passport.hualala.com/login?redirectURL=http://api.transformer.hualala.com';

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
