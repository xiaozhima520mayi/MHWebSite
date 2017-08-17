//设置cookie
function setCookie(name, value, expires, path, domain, secure)			//expires处设置cookie保存的天数
{
    var expDays = expires * 24 * 60 * 60 * 1000;
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + expDays);
    var expString = ((expires == null) ? "" : (";expires=" + expDate.toGMTString()))
    var pathString = ((path == null) ? "" : (";path=" + path))
    var domainString = ((domain == null) ? "" : (";domain=" + domain))
    var secureString = ((secure == true) ? ";secure" : "")
    document.cookie = name + "=" + decodeURIComponent(value) + expString + pathString + domainString + secureString;
}
//获取指定名称的cookie值：
function getCookie(name) {
    var result = null;
    var myCookie = document.cookie + ";";
    var searchName = name + "=";
    var startOfCookie = myCookie.indexOf(searchName);
    var endOfCookie;
    if (startOfCookie != -1) {
        startOfCookie += searchName.length;
        endOfCookie = myCookie.indexOf(";", startOfCookie);
        result = decodeURIComponent(myCookie.substring(startOfCookie, endOfCookie));
    }
    return result;
}
//删除指定名称的cookie(文件)：
function delCookie(name, expires, path) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=; expires=" + expires + ";path=" + path;
}
