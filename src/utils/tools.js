//深度拷贝
export function deepClone(origin, obj) {
    let target = obj || {};
    for (let prop in origin) {
        // eslint-disable-next-line no-prototype-builtins
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== "null" && typeof (origin[prop]) == "object") {
                target[prop] = Object.prototype.toString.call(origin[prop]) === '[object Array]' ? [] : {};
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}
//数组转树结构数组
export function translateDataToTree(sNodes, key, parentKey, childKey) {
    let i, l;
    key = key || "id";
    parentKey = parentKey || "pId";
    childKey = childKey || "children";
    if (!key || key == "" || !sNodes) return [];
    if (Object.prototype.toString.call(sNodes) === '[object Array]') {
        let r = [];
        let tmpMap = [];
        for (i = 0, l = sNodes.length; i < l; i++) {
            tmpMap[sNodes[i][key]] = sNodes[i];
        }
        for (i = 0, l = sNodes.length; i < l; i++) {
            if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                if (!tmpMap[sNodes[i][parentKey]][childKey])
                    tmpMap[sNodes[i][parentKey]][childKey] = [];
                tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
            } else {
                r.push(sNodes[i]);
            }
        }
        return r;
    } else {
        return [sNodes];
    }
}

export const getObjType = obj => {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}

export const deepClones = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClones(data[i]))
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClones(data[key])
        }
    }
    return obj
}