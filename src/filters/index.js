/**
 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
export const dateFormat = (date, format = 'yyyy/MM/dd') => {
    if (!date) {
        return '-'
    }
    let d = new Date(date)
    
    let o = {
        'M+': d.getMonth() + 1,
        // 月份
        'd+': d.getDate(),
        // 日
        'h+': d.getHours() % 12 == 0 ? 12 : d.getHours() % 12,
        // 小时
        'H+': d.getHours(),
        // 小时
        'm+': d.getMinutes(),
        // 分
        's+': d.getSeconds(),
        // 秒
        'q+': Math.floor((d.getMonth() + 3) / 3),
        // 季度
        'S': d.getMilliseconds()
    // 毫秒
    }
    let week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + '')
                .substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(format)) {
        format = format.replace(
                        RegExp.$1,
                        ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f'
                                : '/u5468')
                                : '') + week[d.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                    : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return format
}

// 配置图片前缀
export const joinImgPrefix = (val) => {
    if(!val) {
        return val
    }
    return window.imgPreSrc + val
}