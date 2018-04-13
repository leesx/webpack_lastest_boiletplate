/*
 * @Author: leesx
 * @Date: 2017-07-11 18:35:08
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-11 18:35:46
 */
import myAxios from "./myAxios";
import cookie from "./cookie";
import setRowKey from "./setRowKey";

/**
 * 格式化input输入的数字
 * @param v 输入的值
 * @param fix 保留的几位小数点，0代表只能输入整数
 * @param max 最大的输入的数字
 * @returns  返回格式后的结果
 */
function parseNumber(v = 0, fix = 0, max = 999999) {
    v = `${v}`;
    if (fix === 0) {
        v = v.replace(/[^\d|\.]/g, '');
    } else {
        v = v.replace(/[^\d|\.]/g, '');
        const valueArr = v.split('.');
        if (valueArr.length > 1) {
            //处理当输入 .33 的情况
            if(valueArr[0] === ''){
                v = v.substring(0,3);
            }else{
                const reg = new RegExp('^(\\d+)\.(\\d{0,2}).*$');
                v = v.replace(reg, '$1.$2');
            }

        }

    }
    if (v*1 > max) {
        return v.substring(0, 6)
    }
    return v;
}

export {
    myAxios,
    cookie,
    setRowKey,
    parseNumber,
}
