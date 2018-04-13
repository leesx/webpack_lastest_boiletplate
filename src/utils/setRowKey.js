export default function setRowKey(data = []) {
    if (!(data instanceof Array)) {
        throw new Error('参数必须为数组')
    }
    return data.map((item, index) => {
        //给每一项加入一个_rowIndex,由于antd table过滤功能，改变了索引。
        return !item.key ? Object.assign({},item, {key: `rowKey_${index}`, _rowIndex: index}) : item;
    })
}
