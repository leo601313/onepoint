exports.tool_funcs = { Msg_file, Msg_info, Msg_list, Msg_301, Msg_html, formatSize, formatDate, getExtByName, urlSpCharEncode, getmd5 };

const crypto = require('crypto');
/**
 * onepoint ukuq
 * time:191201
 */

function Msg_file(fileInfo, readMe_type, readMe_txt, script) {
    return {
        'statusCode': 200,
        'type': 0,
        'data': {
            'fileInfo': fileInfo
        },
        'readMe': {
            type: readMe_type || 2,
            txt: readMe_txt || "## Powered by [OnePoint](https://github.com/ukuq/onepoint)\n\n"
        },
        'script': script || ""
    }
}

function Msg_list(content, prevHref, nextHref, readMe_type, readMe_txt, script) {
    let readme = content.find((e) => { return e.name === 'README.md' });
    if (readMe_type === undefined && readme && readme.downloadUrl) {
        readMe_type = 1;
        readMe_txt = readme.downloadUrl;
    }
    return {
        'statusCode': 200,
        'type': 1,
        'data': {
            'content': content,
            'prevHref': prevHref,
            'nextHref': nextHref
        },
        'readMe': {
            type: readMe_type || 2,
            txt: readMe_txt || "## Powered by [OnePoint](https://github.com/ukuq/onepoint)\n\n"
        },
        'script': script || ""
    }
}

function Msg_info(statusCode, info, headers, readMe_type, readMe_txt, script) {
    return {
        'statusCode': statusCode,
        'type': statusCode === 200 ? 2 : undefined,
        'info': info || "开发者没有填写, 我也不知道是啥",
        'headers': headers || {},
        'readMe': {
            type: readMe_type || 0,
            txt: readMe_txt || ""
        },
        'script': script || ""
    };
}

function Msg_301(location, info, readMe_type, readMe_txt, script) {
    return {
        'statusCode': 301,
        'headers': {
            'location': location,
        },
        'info': info || "redirecting to :" + location,
        'readMe': {
            type: readMe_type || 2,
            txt: readMe_txt || "## Powered by [OnePoint](https://github.com/ukuq/onepoint)\n\n"
        },
        'script': script || ""
    }
}


function Msg_html(statusCode, html, headers) {
    return {
        'noRender': true,
        'statusCode': statusCode,
        'headers': headers || { 'Content-Type': 'text/html' },
        'html': html || "nothing"
    }
}

function formatDate(str) {
    let oDate = new Date(str);
    if ('Invalid Date' === oDate) return oDate;
    let oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() < 9 ? "0" + (oDate.getMonth() + 1) : (oDate.getMonth() + 1),
        oDay = oDate.getDate() < 10 ? "0" + oDate.getDate() : oDate.getDate(),
        oHour = oDate.getHours() < 10 ? "0" + oDate.getHours() : oDate.getHours(),
        oMinute = oDate.getMinutes() < 10 ? "0" + oDate.getMinutes() : oDate.getMinutes(),
        oSecond = oDate.getSeconds() < 10 ? "0" + oDate.getSeconds() : oDate.getSeconds(),
        oTime = oYear + '-' + oMonth + '-' + oDay + " " + oHour + ":" + oMinute + ":" + oSecond;//最后拼接时间
    return oTime;
};


/**
 * 格式化文件大小信息
 * @param {*} size 
 */
function formatSize(size) {
    if (!size) return size;
    else size = Number(size);
    let count = 0;
    while (size >= 1024) {
        size /= 1024;
        count++;
    }
    size = size.toFixed(2);
    size += [' B', ' KB', ' MB', ' GB'][count];
    return size;
};


function getExtByName(name) {
    if (!name) return "";
    let pos = name.lastIndexOf('.');
    if (pos === -1) return "";
    else return name.slice(pos + 1);
}

function urlSpCharEncode(s) {
    if (!s) return s;
    let res = '';
    for (let len = s.length, i = 0; i < len; i++) {
        let ch = s[i];
        switch (ch) {
            case '%':
                res += '%25';
                break;
            case '?':
                res += '%3f';
                break;
            case '#':
                res += '%23';
                break;
            case ' ':
                res += '%20';
                break;
            default:
                res += ch;
        }
    }
    return res;
}


function getmd5(data) {
    if (!data) return data;
    const hash = crypto.createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}