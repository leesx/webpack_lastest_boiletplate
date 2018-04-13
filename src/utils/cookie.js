const cookie = {};

/*
 功能：保存cookies函数
 参数：name，cookie名字；value，值
 */
cookie.setItem = (name, value) => {
    const Days = 30*12;  //cookie 将被保存一年
    const exp = new Date(); //获得当前时间
    exp.setTime(exp.getTime() + Days*24*60*60*1000); //换成毫秒
    document.cookie = name + "=" + decodeURI(value) + "; expires=" + exp.toGMTString() + ";path=/";
}
/*
 功能：获取cookies函数
 参数：name，cookie名字
 */
cookie.getItem = (name) => {
    const arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return decodeURIComponent(arr[2]);
    }
    return;
}
/*
 功能：删除cookies函数
 参数：name，cookie名字
 */

cookie.remove = (name, domain) => {
    const exp = new Date(); //当前时间
    exp.setTime(-exp.getTime());
    const cval = cookie.getItem(name);
    if (cval != null) document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() + "; domain=" + domain;
}

export default cookie;
